const getPost = require('../../../controllers/post/getPost');
const isLoggedIn = require('../../../controllers/isLoggedIn');

const determineIfLiked = (comment, userId) => {
    const likedBy = comment.likedBy || [];
    const index = likedBy.findIndex(liker => {
        return liker == userId;
    })
    if (index!==-1){
        return true;
    }
    return false;
}

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
        });
        if (!comment){
            return res.status(404).send({ err: 'Comment not found!' });
        }
        const likedBy = comment.likedBy || [];
        comment.likes = likedBy.length;
        const loggedIn = await isLoggedIn(req);
        if (loggedIn){
            const loggedUser = req.session.user.id;
            const isLiked = determineIfLiked(comment, loggedUser);
            comment.isLiked = isLiked;
        }
        return res.status(200).send(comment);

    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'Server error' });
    }
}

module.exports = getComment;