const postComment = require('../../controllers/post/postComment');

//Post a comment on a post
const createComment = async (req, res) => {

    // Add the comment to both user model and the post model

    // const comment = req.body || {};
    let comment = { ...req.query } || {};
    const errors= [];
    if (!comment.comment) {
        errors.push({ err: 'Provide a comment body' });
        return res.send(errors);
    }
    try {
        //comment = req.body || {};
        let comment = { ...req.query } || {};
        const userId = req.session.user.id;
        const postId = req.params.id;

        await postComment(comment, postId,  userId);
        
        return res.send({ msg: 'Comment posted' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong while commenting');
    }
}
module.exports = createComment;