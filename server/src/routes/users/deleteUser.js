const User  = require('../../models/User');

// delete a user
const deleteUser = async(req, res) => {
    if (req.session.user.id !=req.params.id) {
        const error = { err: 'Can\'t perform this action as you are not logged in as this user!' };
        return res.status(403).send(error);
    }
    try {
        await User.destroy({
            where: {
                id: req.session.user.id
            }
        });
        return res.status(200).send({ msg: 'Deleted successfully!' })
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'Couldn\'t delete user' });
    }
}

module.exports = deleteUser;