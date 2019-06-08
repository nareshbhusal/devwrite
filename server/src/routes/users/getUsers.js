const User = require('../../models/User');

// Get all users
const getUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        return res.send(users);
    } catch(err) {
        console.log(err);
        return res.send(404);
    }
};

module.exports = getUsers;