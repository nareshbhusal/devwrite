const Post = require('../../models/Post');

const updatePost = async(postData, updatedPost) => {
    const post = await Post.update(
        { ...updatedPost },
        {
            where: { ...postData }
        }
    )
    return post;
}

module.exports = updatePost;