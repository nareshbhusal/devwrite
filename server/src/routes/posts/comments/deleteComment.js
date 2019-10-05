
const getPost = require('../../../controllers/post/getPost');
const updatePost = require('../../../controllers/post/updatePost');

// Delete comment
const deleteComment = async (req, res) => {
    try {
        const { postid, commentid } = req.params;
        const userId = req.session.user.id;
        console.log(postid, commentid, userId);

        const post = await getPost({ id: postid });

        let comments = post.comments || [];
        if (typeof(comments) === 'string') {
            comments = JSON.parse(comments);
        }
        const commentIndex = comments.findIndex(comment => {
            return comment.id == commentid && userId == comment.userId
        });
        if (commentIndex===-1) {
            return res.status(400).send({err: 'Wait, that\'s illegal...'});
        }
        comments.splice(commentIndex, 1);
        comments = JSON.stringify(comments);

        await updatePost({ id: postid }, { comments });

        return res.status(200).send({ msg: 'Deleted comment successfully!' });
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong'});
    }
}

module.exports = deleteComment;