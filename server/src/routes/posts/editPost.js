const updatePost = require('../../controllers/post/updatePost');

// Edit the creds of a post by id 
//put
const editPost = async (req, res) => {
    
    try {
        const postId = req.params.id;
        const userId = req.session.user.id;
        const updatedPost = { ...req.body };
        // add edit timestamp
        updatedPost.editedAt = new Date().getTime();
        const postData = {
            user: userId,
            id: postId
        };
        const post = await updatePost(postData, updatedPost);
        if (!post) {
            return res.status(409).send({err: 'Is this your post? This is awkward..hmmm...'})
        }
        return res.status(201).send({ msg: 'Updated the post' });
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Sever error: Something went wrong editing post :('});
    }
}

module.exports = editPost;