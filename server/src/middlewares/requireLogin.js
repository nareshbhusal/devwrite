const User = require('../models/User');

const clearHeaderCache = (res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
}

const requireLogin = async (req, res, next) => {

    // Check if session exists
    if (!req.session) {
        return res.send({ err: 'This action requires authorization! Please login or signup' });
        
    }
    console.log('session found', req.session.user.id);
    if (req.session.user) {
        // lookup the user in the DB by pulling their email from the session
        try{
            const user = await User.findOne({
                where: {
                    id: req.session.user.id,
                }
            });
            console.log(user);
            // Check if the id and sessionID in session match the ones in DB
            if (user) {
                console.log('user found');
                const isAuthorized = user.session_ids.split(',').some(session_id => {
                    return session_id === req.session.sessionID
                });
                if (isAuthorized) {
                    console.log('user is authorized')
                    clearHeaderCache(res);
                    return next();
                } else {
                    // clear the browser session
                    req.session.destroy((err) => {
                        if(err) {
                            return console.log(err);
                        }
                        console.log('session should be destroyed');
                    });
                    throw 'Session data doesn\'t match'
                }
            }
            return res.send([{ err: 'This action requires authorization! Please login or signup' }]);
        } catch(err) {
            console.log('error checking authorization status', err);
            return res.send([{ err: 'Something went wrong checking authorization' }]);
        }
    } else {
        // Not logged in. No session
        return res.send([{ err: 'This action requires authorization! Please login or signup' }]);
    }
}

module.exports = requireLogin;