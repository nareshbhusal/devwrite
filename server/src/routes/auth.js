const express = require('express');
const router = express.Router();
const User = require('../models/User');
const updateSessions = require('../controllers/updateSessions');
const getUser = require('../controllers/getUser');

// post
router.get('/login', async (req, res) => {
    // const user = {...req.body};
    const user = {...req.query};

    // server side validation
    const errors = [];
    if (!user.email || !user.password) {
        errors.push({ err: 'Please fill in all fields' });
        return res.send(errors);
    }

    try {
        const userInRecords = await getUser(user);

        if (userInRecords) {
            await updateSessions(userInRecords, req.sessionID);
            // login successful
            console.log('loggedin', userInRecords.name);
            // set user on cookie
            req.session.user = {};
            req.session.user.id = userInRecords.id;
            return res.send({ msg: 'Logged in!' });
        } else {
            // creds don't match
            errors.push({ err: 'Wrong password or username!' })
            return res.send(errors);
        }
        
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong logging in!')
    }
})

router.get('/logout', async (req, res) => {
    res.send('logout');
})

module.exports = router;