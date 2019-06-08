const createPostCtrl = require('../../controllers/post/createPost');

// Create a post
const createPost = async (req, res) => {
    //const post = req.body || {};
    let post = { ...req.query };

    const errors = []
    if (!post.title, !post.about, !post.body) {
        errors.push({ err: 'Please fill in all fields!' });
        return res.send(errors);
    }
    try {
        post = { ...req.query };
        const userId = req.session.user.id;

        await createPostCtrl(userId, post);

        return res.status(200).send({ msg: 'Done!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong!')
    }
}

module.exports = createPost;