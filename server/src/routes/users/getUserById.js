const getUser = require('../../controllers/user/getUser');
const isLoggedIn = require('../../controllers/isLoggedIn');

const parseUser = (user) => {
    // sanitize data for client side rendering
    user.createdAt = new Date(parseInt(user.createdAt)).toDateString().split(' ').splice(1).join(' ');
    user.followers = user.followers || [];
    user.following = user.following || [];
    user.posts = user.posts || [];
    user.commentedPosts = user.commentedPosts || [];
    if (typeof(user.commentedPosts) === 'string') {
        user.commentedPosts = JSON.parse(user.commentedPosts);
    }
    return user;
}

const getUserById = async (req, res) => {
// Get a particular user by its id
    try {
        const id = req.params.id;
        let user = await getUser({ id });
        if (!user) {
            return res.status(404).send({ err: '404. This user is either deleted or never existed!' })
        }
        user = parseUser(user);
        const loggedIn = await isLoggedIn(req);

        if (loggedIn) {
            const loggedUserId = req.session.user.id;
            user.dataValues.followed = user.followers.indexOf(loggedUserId) !== -1;
        }
        return res.status(201).send(user);

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Server error'});
    }
}

module.exports = getUserById;