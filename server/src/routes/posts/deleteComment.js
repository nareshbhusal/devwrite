
const getPost = require('../../controllers/post/getPost');
const updatePost = require('../../controllers/post/updatePost');
const updateUser = require('../../controllers/user/updateUser');

// Delete comment
const deleteComment = async (req, res) => {
    try {
        const timestamp = req.params.timestamp;
        const postId = req.params.id;
        const userId = req.session.user.id;

        const post = await getPost({ id: postId });
        let comments = post.comments;
        if (typeof(comments) === 'string') {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        const commentIndex = comments.findIndex(comment => {
            return comment.createdAt == timestamp && userId == comment.user 
        });
        if (!commentIndex<0) {
            return res.send('Something doesn\'t feel right');
        }
        comments.splice(commentIndex, 1);
        comments = JSON.stringify(comments);

        // update post
        await updatePost({ id: postId }, { comments });
        // update user
        const user = await getUser({ id: userId });
        let commentedPosts = user.commentedPosts;
        if (typeof(commentedPosts) === 'string') {
            commentedPosts = JSON.parse(commentedPosts)
        }
        commentedPosts = commentedPosts || [];
        const commentedPostindex = commentedPosts.findIndex(comment => {
            return comment.createdAt == timestamp && comment.post == postId
        });

        if (commentedPostindex) {
            commentedPosts.splice(commentedPostindex, 1);
        }
        commentedPosts = JSON.stringify(commentedPosts);

        await updateUser(userId, { commentedPosts });

        return res.send({ msg: 'Deleted comment successfully!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong');
    }
}

module.exports = deleteComment;