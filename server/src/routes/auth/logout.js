const getUser = require('../controllers/user/getUser');

const logout = async(req, res) => {
    // Clear session_id from the database
    if (req.session.user) {
        try{
            const userId = req.session.user.id;
            const user = await getUser({ id: userId });
            if (user) {
                // if user exists
                await clearSession(req, user);
                
            } else {
                return res.send([{ err: 'User not logged in!' }]);
            }
        } catch(err) {
            res.status(500).send('something went wrong while trying to log out!')
        }
    } else {
        res.status(400).send('You\'re aready logged out');
    }
}

module.exports = logout;