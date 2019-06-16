const User  = require('../../models/User');
const addCookie = require('../../controllers/user/addCookie');
const getUser = require('../../controllers/user/getUser');

// Register a user
const registerUser = async(req, res) => {
    const user = { ...req.body } || {};
    // const user = { ...req.query };
    // server side validation
    const errors = [];
    if (!user.name || !user.password || !user.email) {
        errors.push({ err: 'Please fill all fields' });
        return res.status(401).send(errors);
    }

    // see if email already exists
    const userInRecords = await getUser({ email: user.email });
    if (userInRecords) {
        errors.push({ err: 'Email is already in use!' })
        return res.status(409).send(errors);
    }

    // attach timestamp and session_id
    user.session_ids = req.sessionID.toString();
    user.createdAt = new Date().getTime();
    
    let newUser;
    try {
        newUser = await User.create(user);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Something went wrong creating user :(')
    }
    // Successful registeration
    // set a cookie
    addCookie(req, newUser);
    return res.status(201).send(req.session);
}

module.exports = registerUser;