const getPost = require('../../../controllers/post/getPost');
const editPost = require('../../../controllers/post/updatePost');

const likeComment = async(req, res) => {
    try {
        let { commentid, postid } = req.params;
        let userId = req.session.user.id;

        commentid = parseInt(commentid);
        postid = parseInt(postid);
        userId = parseInt(userId);

        const post = await getPost({ id: postid });

        let postComments = post.comments || [];
        if (typeof(postComments) === 'string') {
            postComments = JSON.parse(postComments);
        }
        postComments = postComments || [];

        const postCommentIndex = postComments.findIndex(postComment => {
            return postComment.id===commentid;
        });
        if (postCommentIndex ===-1) {
            return res.status(400).send({err: 'Comment not available'});
        }
        const postComment = postComments[postCommentIndex];
        const commentLikes = postComment.likedBy || [];

        // determine if already liked
        let liked = false;
        if (commentLikes.indexOf(userId) === -1) {
            // not liked
            commentLikes.push(userId);
            liked = true;
            
        } else {
            // already liked
            commentLikes.splice(commentLikes.indexOf(userId), 1);
        }
        
        const updatedPostComment = { ...postComment, likedBy: commentLikes };
        postComments[postCommentIndex] = updatedPostComment;
        
        postComments = JSON.stringify(postComments);
        await editPost({ id: postid }, { comments: postComments });
        return res.status(200).send({ msg: `${liked ? 'Liked' : 'Unliked'} comment!` });

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Server error!'});
    }
}

module.exports = likeComment;