
const getPost = require('../../../controllers/post/getPost');
const updatePost = require('../../../controllers/post/updatePost');
const getUser = require('../../../controllers/user/getUser');
const updateUser = require('../../../controllers/user/updateUser');

// Delete comment
const deleteComment = async (req, res) => {
    try {
        const { postid, commentid } = req.params;
        const userId = req.session.user.id;

        // update post
        const post = await getPost({ id: postid });

        let comments = post.comments;
        if (typeof(comments) === 'string') {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        const commentIndex = comments.findIndex(comment => {
            return comment.id == commentid && userId == comment.userId
        });
        if (commentIndex===-1) {
            return res.status(400).send({err: 'Ok but... Something doesn\'t feel right :/'});
        }
        comments.splice(commentIndex, 1);
        comments = JSON.stringify(comments);

        await updatePost({ id: postid }, { comments });

        // update user
        const user = await getUser({ id: userId });
        let commentedPosts = user.commentedPosts;
        if (typeof(commentedPosts) === 'string') {
            commentedPosts = JSON.parse(commentedPosts)
        }
        commentedPosts = commentedPosts || [];
        const commentedPostindex = commentedPosts.findIndex(comment => {
            return comment.id == commentid && comment.postId == postid
        });

        if (commentedPostindex) {
            commentedPosts.splice(commentedPostindex, 1);
        }
        commentedPosts = JSON.stringify(commentedPosts);
        await updateUser(userId, { commentedPosts });
        return res.status(200).send({ msg: 'Deleted comment successfully!' });
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong'});
    }
}

module.exports = deleteComment;