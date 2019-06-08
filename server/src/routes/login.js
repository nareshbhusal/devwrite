const express = require('express');
const router = express.Router();
const updateSessionIDs = require('../controllers/updateSessionIDs');
const addCookie = require('../controllers/addCookie');
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
            // login successful
            await updateSessionIDs(userInRecords, req.sessionID);
            // set user on cookie
            addCookie(req, userInRecords);
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
});

module.exports = router;