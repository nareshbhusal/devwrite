const Post = require('../../models/Post');
const textVersion = require("textversionjs");

const getPost = async (data) => {
    const post = await Post.findOne({
        where: { ...data }
    });
    if(post.title){
        post.title = textVersion(post.title);
    }
    return post;
}


module.exports = getPost;