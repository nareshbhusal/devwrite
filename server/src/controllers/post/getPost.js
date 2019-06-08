const Post = require('../../models/Post');

const getPost = (data) => {
    const post = await Post.findOne({
        where: { ...data}
    });

    return post;
}


module.exports = getPost;