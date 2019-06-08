const updatePost = require('../../controllers/post/updatePost');

// Edit the creds of a post by id 
//put
const editPost = async (req, res) => {
    
    try {
        const postId = req.params.id;
        const userId = req.session.user.id;
        // const upDatedPost = req.body || {};
        const upDatedPost = { ...req.query };
        // add edit timestamp
        upDatedPost.editedAt = new Date().getTime();
        const postData = {
            user: userId,
            id: postId
        };
        const post = await updatePost(postData, updatedPost);
        if (!post) {
            return res.send('This is awkward..hmmm...')
        }
        return res.send({ msg: 'Updated the post' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong');
    }
}

module.exports = editPost;