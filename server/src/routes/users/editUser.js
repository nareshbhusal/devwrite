const updateUser = require('../../controllers/user/updateUser');

// Edit the creds of a user by id 
const editUser = async(req, res) => {

    if (req.session.user.id !=req.params.id) {
        const authError = { err: 'Can\'t perform this action as you are not logged in as this user!' };
        return res.status(403).send(authError);
    }
    const updatedUserValues = { ...req.body };
    
    try {
        const id = req.session.user.id;
        await updateUser(id, { ...updatedUserValues });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'Something went wrong updating the user' });
    }
    return res.status(200).send({msg: 'user with id '+req.params.id+' edited!'})
}

module.exports = editUser;