const getPost = require('../../controllers/post/getPost');
const parsePost = require('../../controllers/post/parsePost');

const isLoggedIn = require('../../controllers/isLoggedIn');

const getPostById = async (req, res) => {
// Get a particular post by its id
    try {
        const id = req.params.id;
        const post = await getPost({ id });
        if (!post) {
            return res.status(404).send({err: '404: No such post found'});
        }
        const loggedIn = await isLoggedIn(req);
        let userId;
        if (loggedIn){
            userId = parseInt(req.session.user.id);
        }
        const parsedPost = await parsePost(post, userId);
        return res.status(200).send(parsedPost);

    } catch(err) {
        console.log(err);
        res.status(500).send({err: 'Something went wrong!'});
    }
}

module.exports = getPostById;