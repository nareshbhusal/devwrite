const express = require('express');
const router = express.Router();
const User = require('../models/User');

const updateSessions = async (user, sessionID) => {

    // takes the user fetched from the database freshly,
    // and update it's session_ids 
    // logic -- keep number of session id below 5

    let session_ids;
    session_ids = user.session_ids;
    if (session_ids) {
        session_ids = session_ids.split(',');
        if (session_ids.length > 4) {
            session_ids.pop();
        }
        session_ids.unshift(sessionID);
        session_ids = session_ids.toString();
    }

    try {
        await User.update(
            { session_ids },
            {
                where: {
                id: user.id
            }
        }
        );
    } catch(err) {
        console.log(err);
    }
}

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
        const userInRecords = await User.findOne({
            where: {
                ...user
            }
        });
        if (userInRecords) {           
            await updateSessions(userInRecords, req.sessionID);
            // login successful
            console.log('loggedin', userInRecords.name);
            // set user on cookie
            req.session.user = {};
            req.session.user.id = userInRecords.id;
            return res.send(req.sessionID);
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