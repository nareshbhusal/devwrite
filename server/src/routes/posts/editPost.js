const updatePost = require('../../controllers/post/updatePost');


const parseTags = (post) => {
    let tags = post.tags || '';
    if (!tags) {
        return [];
    }
    return tags.split(' ');
}

const editPost = async (req, res) => {
    
    try {
        const postId = req.params.id;
        const userId = req.session.user.id;
        const updatedPost = { ...req.body };
        // add edit timestamp
        updatedPost.editedAt = new Date().getTime();
        updatedPost.tags = parseTags(updatedPost);
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