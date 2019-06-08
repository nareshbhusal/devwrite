const Post = require('../../models/Post');

const deletePost = (postData) => {
    await Post.destroy({
        where: { ...postData }
    })
}
module.exports = deletePost;