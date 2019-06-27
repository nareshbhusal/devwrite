const createPostCtrl = require('../../controllers/post/createPost');

// Create a post
const createPost = async (req, res) => {
    let post = req.body || {};
    if (!post.title || !post.body) {
        return res.status(422).send({ err: 'Please fill in all fields!' });
    }
    try {
        post = { ...req.body };
        const userId = req.session.user.id;
        await createPostCtrl(post, userId);
        return res.status(201).send({ msg: 'Post created!' });

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong!'})
    }
}

module.exports = createPost;