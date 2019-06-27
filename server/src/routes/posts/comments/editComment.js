const getPost = require('../../../controllers/post/getPost');
const editPost = require('../../../controllers/post/updatePost');

const editComment = async(req, res) => {
    try {
        const { postid, commentid } = req.params;
        const post = await getPost({ id: postid });

        if (!post) {
            return res.status(400).send({err: 'Post doesn\'t exist'});
        }
        const newCommentData = {
            body: req.body.body,
            editedAt: Date.now().toString()
        }
        // edit post comments
        let comments = post.comments || [];
        if (typeof comments === 'string') {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        const index = comments.findIndex(comment => {
            return comment.id == commentid
        })
        if (index === -1) {
            return res.status(403).send({ err: 'Unauthorized request!' });
        }

        comments[index] = {...comments[index], ...newCommentData }
        comments = JSON.stringify(comments);

        await editPost({ id: postid }, { comments });
        return res.status(201).send({ msg: 'Edited comment' });

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Server error!'})
    }
}

module.exports = editComment;