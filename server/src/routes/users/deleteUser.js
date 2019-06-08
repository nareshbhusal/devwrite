const User  = require('../../models/User');

// delete a user
const deleteUser = async(req, res) => {

    if (req.session.user.id !=req.params.id) {
        const errors = [{ err: 'Can\'t perform this action as you are not logged in as this user!' }];
        return res.send(errors);
    }
    try {
        const user = await User.destroy({
            where: {
                id: req.session.user.id
            }
        });
        if (!user) {
            return res.send({ msg: 'User never existed...that\'s awkward!' })
        } else {
            return res.send({ msg: 'Deleted successfully!' })
        }
        
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Couldn\'t delete user' });
        return res.send(errors);
    }
}

module.exports = deleteUser;