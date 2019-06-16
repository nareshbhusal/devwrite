const getUser = require('../controllers/user/getUser');

const clearHeaderCache = (res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
}

const requireLogin = async (req, res, next) => {

    const authError = 'This action requires authorization! Please login or signup';

    if (!req.session) {
        return res.status(401).send([{ err: authError }]);
    }

    if (req.session.user) {
        // lookup the user in the DB by pulling their email from the session
        try{
            const userId = req.session.user.id;
            const user = await getUser({ id: userId });

            // Check if the userid and sessionID in session match the ones in DB
            if (user) {
                const isAuthorized = user.session_ids.split(',').some(session_id => {
                    return session_id === req.sessionID
                });
                if (isAuthorized) {
                    clearHeaderCache(res);
                    return next();
                }
                // clear the browser session
                req.session.destroy((err) => {
                    if(err) {
                        console.log(err);
                    }
                });
            }
            return res.status(401).send([{ err: authError }]);
        } catch(err) {
            console.log('error checking authorization status', err);
            return res.status(500).send([{ err: 'Something went wrong checking authorization' }]);
        }
    } else {
        // Not logged in. No session
        return res.status(401).send([{ err: authError }]);
    }
}

module.exports = requireLogin;