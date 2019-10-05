const deletePostCtrl = require('../../controllers/post/deletePost');
const getPost = require('../../controllers/post/getPost');

const authError = { err: 'You are not authorized to delete this post!' };
const deletePost = async(req, res) => {
// delete a post
    try {
        const postId = parseInt(req.params.id);
        const userId = parseInt(req.session.user.id);
        const postData = { user: userId, id: postId };
        const post = await getPost(postData);
        if (post){
            await deletePostCtrl(postData);
            return res.status(200).send({ msg: 'Deleted post!' });
        }
        return res.status(403).send(authError);
    } catch(err) {
        console.log(err);
        return res.status(400).send({err: 'Something went wrong deleting post'})
    }
}


module.exports = deletePost;