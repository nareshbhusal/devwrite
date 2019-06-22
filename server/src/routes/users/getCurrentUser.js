const getUser = require('../../controllers/user/getUser');

const getCurrentUser = async(req, res) => {
    try {

        const id = req.session.user.id;
        const user = await getUser({ id })
        return res.status(200).send(user);
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'Something went wrong fetching your profile :(' });
    }
}

module.exports = getCurrentUser;