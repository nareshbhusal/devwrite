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
        if (!post){
            return res.status(403).send(authError);
        }
        await deletePostCtrl(postData);
        return res.status(200).send({ msg: 'Deleted post!' });
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong deleting post'})
    }
}


module.exports = deletePost;