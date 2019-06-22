const isLoggedIn = require('../controllers/isLoggedIn');

const clearHeaderCache = (res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
}


const requireLogin = async (req, res, next) => {

    const authError = {err: 'This action requires authorization! Please login or signup'};
    const serverError = { err: 'Server error: Something went wrong checking authorization' };

    let loggedIn;
    
    try {
        loggedIn = await isLoggedIn(req);

    } catch(err) {
        return res.status(500).send(serverError);
    }

    if (loggedIn) {
        clearHeaderCache(res);
        return next();
    } else {
        return res.status(403).send(authError);
    }
}

module.exports = requireLogin;