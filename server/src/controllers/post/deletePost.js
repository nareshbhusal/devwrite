const Post = require('../../models/Post');

const deletePost = async (postData) => {
    await Post.destroy({
        where: { ...postData }
    })
}
module.exports = deletePost;