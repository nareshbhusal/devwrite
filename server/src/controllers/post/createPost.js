const Post = require('../../models/Post');
const getUser = require('../../controllers/user/getUser');
const updateUser = require('../../controllers/user/updateUser');
const registerTags = require('../tag/registerTags');

// @param post is an object with title, about, body, tags properties
// @param userId is the id of the poster

const parseTags = (post) => {
    let tags = post.tags || '';
    if (!tags) {
        return [];
    }
    console.log('*********', tags);
    return tags;
}

const createPost = async (post, userId) => {
    post.user = userId;

    // add timestamp and tags
    post.createdAt = new Date().getTime();
    post.tags = parseTags(post);
    
    try {
        // get the user
        const user = await getUser({ id: userId });
        
        const username = user.name;
        post.username = username;
        const createdPost = await Post.create(post);
        await registerTags(post.tags, createdPost.id);
        
        // update the posts id column in the database on user table
        let userPosts = user.posts || [];
        userPosts.push(parseInt(createdPost.id));

        await updateUser(userId, { posts: userPosts });

    } catch(err) {
        throw err;
    }
}

module.exports = createPost;