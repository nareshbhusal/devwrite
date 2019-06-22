const User  = require('../../models/User');
const addCookie = require('../../controllers/user/addCookie');
const getUser = require('../../controllers/user/getUser');

// Register a user
const registerUser = async(req, res) => {

    try {
        const user = { ...req.body } || {};
        // const user = { ...req.query } || {};
    
        // server side validation
        if (!user.name || !user.password || !user.email) {
            
            return res.status(422).send({ err: 'Please fill all fields' });
        }
    
        // see if email already exists
        const userInRecords = await getUser({ email: user.email });
        if (userInRecords) {
    
            return res.status(409).send({ err: 'Email is already in use!' });
        }
    
        // attach timestamp and session_id
        console.log(req.sessionID)
        user.session_ids = req.sessionID.toString();
        user.createdAt = new Date().getTime();
        // user.id = 1; // remove this
        let newUser;
        try {
            newUser = await User.create(user);
        } catch(err) {
            console.log(err);
            return res.status(500).send({err: 'Something went wrong creating user :('})
        }
        // Successful registeration
        // set a cookie
        addCookie(req, newUser);
        return res.status(201).send({ msg: 'User registered successfully!' })

    } catch(err) {
        console.log(err);
    }
}

module.exports = registerUser;