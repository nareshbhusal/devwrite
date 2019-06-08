const User = require('../../models/User');
const Post = require('../../models/Post');

const createPost = async (post, userId) => {
    post.user = userId;
    // add timestamp
    post.createdAt = new Date().getTime();
    post = await Post.create(post);
    // get the user
    const user = await getUser({ id: userId });

    // update the posts id column in the database on user table
    let posts = user.posts || [];
    posts.push(parseInt(post.id));

    await updateUser(userId, { posts });
}

module.exports = createPost;