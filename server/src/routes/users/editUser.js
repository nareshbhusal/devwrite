const updateUser = require('../../controllers/user/updateUser');

// Edit the creds of a user by id 
const editUser = async(req, res) => {
    //const updatedUserValues = req.body;
    if (req.session.user.id !=req.params.id) {
        const errors = [{ err: 'Can\'t perform this action as you are not logged in as this user!' }];
        return res.send(errors);
    }
    const updatedUserValues = { ...req.query };
    console.log(updatedUserValues);
    try {
        const id = req.user.session.id;
        await updateUser({ id }, { ...updatedUserValues });
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Something went wrong updating the user' });
        return res.send(errors);
    }
    return res.send({msg: 'user with id '+req.params.id+' edited!'})
}

module.exports = editUser;