const getUser = require('../../controllers/user/getUser');

const getCurrentUser = async(req, res) => {
    try {
        console.log(req.session)
        const id = req.session.user.id;
        const user = await getUser({ id })
        console.log(user);
        return res.send(user);
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Something went wrong fetching your profile :(' });
        return res.send(errors);
    }
}

module.exports = getCurrentUser;