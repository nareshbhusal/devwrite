const getUser = require('../../controllers/user/getUser');
const getPost = require('../../controllers/post/getPost');
const updateUser = require('../../controllers/user/updateUser');
const updatePost = require('../../controllers/post/updatePost');

const generateCommentId = (comments) => {
    // generate id 1 greater than the comment with greatest id
       // except if the max id is infinite -- edge case
    if(!comments.length){
	return 1;
    }
    const commentsIds = comments.map(comment => {
        if (isFinite(comment.id)){
            return comment.id
        }
        return 0;
    });
    const maxCommentId = Math.max(...commentsIds) || 1;
    const newId = maxCommentId + 1;
    return newId;
}

// @param comment is the comment text body

const postComment = async (comment, postId,  userId) => {
    const user = await getUser({ id: userId });
    const post = await getPost({ id: postId });

    let comments = user.commentedPosts || [];
    if (typeof(comments)==='string') {
        comments = JSON.parse(comments);
    }
    const newComment = {
        body: comment,
        createdAt: new Date().getTime(),
        username: user.name,
        postTitle: post.title,
        postId,
        userId
    }
    newComment.id = generateCommentId(comments);
    // Push this to user table's commentedPosts column
    comments.push({id: newComment.id, postId: newComment.postId});

    comments = JSON.stringify(comments);
    await updateUser(userId, { commentedPosts: comments });
    // Push also to the post table

    let postComments = post.comments || [];
    if (typeof(postComments) === "string") {
        postComments = JSON.parse(postComments);
    }

    postComments.push(newComment);
    postComments = JSON.stringify(postComments);
    await updatePost({ id: postId }, { comments: postComments });
}

module.exports = postComment;
