const getUser = require('../../controllers/user/getUser');
const clearSession = require('../../controllers/user/clearSession');

const logout = async(req, res) => {
    
    if (!req.session) {
        return res.status(400).send({ err: 'Already logged out!' });
    }
    // Clear session_id from the database
    if (req.session.user) {
        try{
            const userId = req.session.user.id;
            const user = await getUser(userId);
            if (user) {
                // if user exists
                await clearSession(req, user);
                return res.status(200).send({ msg: 'User logged out!' });
                
            }

        } catch(err) {
            res.status(500).send({err: 'something went wrong while trying to log out!'})
        }
    }
    res.status(409).send({ err: 'Already logged out!' });
}

module.exports = logout;