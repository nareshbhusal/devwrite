const getUser = require('./user/getUser');

const isLoggedIn = async(req) => {
    if (!req.session) {
        return false;
    }
    if (req.session.user) {
        // lookup the user in the DB by pulling their email from the session
        const userId = req.session.user.id;
        const user = await getUser({ id: userId });

        // Check if the userid and sessionID in session match the ones in DB
        if (user) {
            const isAuthorized = user.session_ids.split(',').some(session_id => {
                return session_id === req.sessionID
            });
            if (isAuthorized) {
                return true;
            }
            // clear the browser session
            req.session.destroy((err) => {
                if(err) {
                    console.log(err);
                }
            });
        }
        return false;

    } else {
        // Not logged in. No session
        return false;
    }
}

module.exports = isLoggedIn;