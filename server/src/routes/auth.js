const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
            // login successful
            console.log('loggedin', userInRecords.name);
            return res.send('logged in successfully!')
        } else {
            // creds don't match
            errors.push({ err: 'Wrong password or username!' })
            return res.send(errors);
        }
        
    } catch(err) {
        console.log(err);
    }
    res.send('login');
})

router.get('/logout', async (req, res) => {
    res.send('logout');
})

module.exports = router;