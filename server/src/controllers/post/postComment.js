const getUser = require('../../controllers/user/getUser');
const getPost = require('../../controllers/post/getPost');
const updateUser = require('../../controllers/user/updateUser');
const updatePost = require('../../controllers/post/updatePost');

// @param comment is the comment text body

const postComment = async (comment, postId,  userId) => {
    const user = await getUser({ id: userId });
        let comments = user.commentedPosts;
        if (typeof(comments)==='string') {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        comment = {
            comment: comment.comment,
            createdAt: new Date().getTime(),
            post: postId
        }
        comments.push(comment);

        // Push this to user table's commentedPosts column
        await updateUser({ id: userId }, { commentedPosts: comments });

        // Push also to the post table
        const post = await getPost({ id: postId });
        delete comment.post;
        comment.user = userId;
        comment.username = user.name;
        console.log(typeof post.comments);
        comments = post.comments;
        if (typeof(comments) === "string") {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        // comments = JSON.parse(JSON.stringify(comments).trim()) || [];
        console.log(typeof comments);
        comments.push(comment);
        comments = JSON.stringify(comments);
        await updatePost({ id: postId }, { comments });
}

module.exports = postComment;