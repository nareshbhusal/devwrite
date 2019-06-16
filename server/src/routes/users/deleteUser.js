const User  = require('../../models/User');

// delete a user
const deleteUser = async(req, res) => {

    if (req.session.user.id !=req.params.id) {
        const errors = [{ err: 'Can\'t perform this action as you are not logged in as this user!' }];
        return res.status(403).send(errors);
    }
    try {
        const user = await User.destroy({
            where: {
                id: req.session.user.id
            }
        });

        return res.status(200).send({ msg: 'Deleted successfully!' })
        
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Couldn\'t delete user' });
        return res.status(500).send(errors);
    }
}

module.exports = deleteUser;