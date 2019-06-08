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

router.get('/logout', async (req, res) => {
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
})

module.exports = router;