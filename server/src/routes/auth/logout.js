const getUser = require('../../controllers/user/getUser');
//import clearSession

const logout = async(req, res) => {
    if (!req.session) {
        return res.send([{ err: 'Already logged out!' }]);
    }
    // Clear session_id from the database
    if (req.session.user) {
        try{
            const userId = req.session.user.id;
            const user = await getUser({ id: userId });
            if (user) {
                // if user exists
                await clearSession(req, user);
                return res.status(200).send({ msg: 'User logged out!' });
                
            } else {
                return res.status(400).send([{ err: 'Already logged out!' }]);
            }
        } catch(err) {
            res.status(500).send('something went wrong while trying to log out!')
        }
    } else {
        res.status(400).send([{ err: 'Already logged out!' }]);
    }
}

module.exports = logout;