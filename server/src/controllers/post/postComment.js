const getUser = require('../../controllers/user/getUser');
const getPost = require('../../controllers/post/getPost');
const updateUser = require('../../controllers/user/updateUser');
const updatePost = require('../../controllers/post/updatePost');

// @param comment is the comment text body

const postComment = async (comment, postId,  userId) => {
    const user = await getUser({ id: userId });
    const post = await getPost({ id: postId });

    let comments = user.commentedPosts || [];
    if (typeof(comments)==='string') {
        comments = JSON.parse(comments);
    }
    comments = comments || [];
    const commentId = Math.max(...comments.map(comment => {
        return comment.id
    })) +1;

    const newComment = {
        body: comment,
        createdAt: new Date().getTime(),
        id: commentId,
        username: user.name,
        postTitle: post.title,
        postId,
        userId
    }
    console.log(newComment);

    // Push this to user table's commentedPosts column
    comments.push(newComment);

    comments = JSON.stringify(comments);
    await updateUser(userId, { commentedPosts: comments });
    console.log(comments)
    // Push also to the post table

    let postComments = post.comments || [];
    if (typeof(postComments) === "string") {
        postComments = JSON.parse(postComments);
    }

    postComments = postComments || [];

    postComments.push(newComment);
    postComments = JSON.stringify(postComments);
    await updatePost({ id: postId }, { comments: postComments });
}

module.exports = postComment;