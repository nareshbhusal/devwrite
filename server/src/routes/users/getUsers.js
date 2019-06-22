const User = require('../../models/User');

// Get all users
const getUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).send(users);

    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Server error fetching users'});
    }
};

module.exports = getUsers;