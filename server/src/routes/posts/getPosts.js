const Post = require('../../models/Post');

const getPost = async (req, res) => {
    try {
        const posts = await Post.findAll();
        if (!posts.length) {
            return res.send('404. No posts found!');
        }
        return res.send(posts);
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong fetching posts');
    }
}

module.exports = getPost;