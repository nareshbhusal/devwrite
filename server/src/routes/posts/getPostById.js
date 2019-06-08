const getPost = require('../../controllers/post/getPost');

const getPostById = async (req, res) => {
// Get a particular post by its id
    try {
        const id = req.params.id;
        const post = await getPost({ id });
        if (!post) {
            return res.send([{err: '404! no such post found'}]);
        }
        return res.status(300).send(post);
    } catch(err) {
        console.log(err);
        res.send('Something went wrong!');
    }
}

module.exports = getPostById;