const getUser = require('../../controllers/user/getUser');

const getUserById = async (req, res) => {
// Get a particular user by its id
    try {
        const id = req.params.id;
        const user = await getUser({ id });
        if (user) {
            return res.send(user);
        } else {
            const errors = [{ err: '404. User not found' }]
            return res.send(errors);
        }
    } catch(err) {
        console.log(err);
        return res.send(404);
    }
}

module.exports = getUserById;