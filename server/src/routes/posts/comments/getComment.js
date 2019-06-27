const getPost = require('../../../controllers/post/getPost');

const getComment = async(req, res) => {
    try {
        const postId = parseInt(req.params.postid);
        const commentId = parseInt(req.params.commentid);

        const post = await getPost({ id: postId });
        if (!post) {
            return res.status(404).send({ err: 'Post not found' });
        }
        let postComments = post.comments || [];
        if (typeof(postComments) ==='string') {
            postComments = JSON.parse(postComments);
        }

        const comment = postComments.find(postComment => {
            return postComment.id === commentId;
        })

        if (comment) {
            return res.status(200).send(comment);
        } else {
            return res.status(404).send({ err: 'Comment not found!' });
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'Server error' });
    }
}

module.exports = getComment;