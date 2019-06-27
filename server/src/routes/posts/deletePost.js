const deletePostCtrl = require('../../controllers/post/deletePost');

const deletePost = async(req, res) => {
// delete a post
    try {
        const postId = parseInt(req.params.id);
        const userId = parseInt(req.session.user.id);
        await deletePostCtrl(
            { 
                user: userId,
                id: postId
            }
        );
        return res.status(200).send({ msg: 'Deleted post!' });
    } catch(err) {
        console.log(err);
        return res.status(400).send({err: 'Something went wrong deleting post'})
    }
}


module.exports = deletePost;