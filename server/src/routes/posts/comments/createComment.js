const postComment = require('../../../controllers/post/postComment');

//Post a comment on a post
const createComment = async (req, res) => {

    // Add the comment to both user model and the post model

    const comment = req.body;
    if (!comment.body) {
        return res.status(422).send({ err: 'Please provide a comment body!' });
    }
    
    try {
        const { body } = req.body;

        const userId = req.session.user.id;
        const { postid } = req.params;

        await postComment(body, postid,  userId);
        return res.status(201).send({ msg: 'Comment posted' });
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong while commenting'});
    }
}
module.exports = createComment;