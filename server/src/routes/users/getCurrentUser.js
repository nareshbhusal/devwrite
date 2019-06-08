const getUser = require('../../controllers/user/getUser');

const getCurrentUser = async(req, res) => {
    try {
        const id = req.session.user.id;
        const user = await getUser({ id })
        return res.send(user);
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Something went wrong fetching your profile :(' });
        return res.send(errors);
    }
}

module.exports = getCurrentUser;