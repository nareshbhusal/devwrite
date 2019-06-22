const readingTime = require('reading-time');
const getUser = require('../user/getUser');

const isSavedAndLiked = async (postId, likedPosts, savedPosts) => {

    // determine if post is liked and saved by the user if id `userId`
    let saved=false;
    let liked=false;
    
    if (savedPosts.indexOf(postId) !==-1) {
        saved=true;
    }
    if (likedPosts.indexOf(postId) !==-1) {
        liked=true;
    }
    return { saved, liked };
}

const parseComments = (post, loggedUserId) => {
    let comments = post.comments || [];
    if (typeof(comments) === 'string') {
        comments = JSON.parse(comments);
    }
    return comments.map(comment => {
        const likedBy = comment.likedBy || [];
        comment.isLiked = likedBy.indexOf(loggedUserId) !==-1;
        return comment;
    });
    
}


const parsePost = async (post, loggedUserId) => {
    
    // determine if argument `post` is a single post or a list (of posts)
    // @param `loggedUserId` is only passed when client is authorized / logged in

    let posts;
    let singlePost;
    if (post.title) {
        singlePost=true;
        posts = [post];
    } else {
        singlePost=false;
        posts = post;
    }
    if (loggedUserId) {
        loggedUser = await getUser({ id: loggedUserId});
        savedPosts = loggedUser.savedPosts || [];
        likedPosts = loggedUser.likedPosts || [];

    }
    
    posts = await Promise.all(posts.map(async post => {
        post.likedBy = post.likedBy || [];
        post.comments = parseComments(post, loggedUserId);
        post.dataValues.readingTime = readingTime(post.body).text;
        post.dataValues.date = new Date(parseInt(post.createdAt)).toDateString().split(' ').splice(1).join(' ');

        if (loggedUserId) {
            const savedAndLiked = await isSavedAndLiked(post.id, likedPosts, savedPosts);

            post.dataValues.saved = savedAndLiked.saved;
            post.dataValues.liked = savedAndLiked.liked;
        }

        return post;
    }));

    // console.log(posts);
    
    if (singlePost) {
        return posts[0];
    }
    return posts;
}

module.exports = parsePost;