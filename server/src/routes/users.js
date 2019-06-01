const express = require('express');
const multer = require('multer');
const router = express.Router();
const User  = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.send(users);
    } catch(err) {
        console.log(err);
        return res.send(404);
    }
})

// Register a user
//post
router.get('/register', async (req, res) => {
    // const user = { ...req.body } || {};
    const user = { ...req.query };

    // server side validation
    const errors = [];
    if (!user.name || !user.password || !user.email) {
        errors.push({ err: 'Please fill all fields' });
        return res.send(errors);
    }

    // see if email already exists
    const userInRecords = await User.findOne({
        email: user.email
    });
    console.log(userInRecords); //
    if (userInRecords) {
        errors.push({ err: 'Email is already in use!' })
        return res.send(errors);
    }

    // attach timestamp and session_id
    user.session_ids = req.sessionID.toString();
    user.createAt = new Date().getTime();
    
    let newUser;
    try {
        newUser = await User.create(user);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Something went wrong creating user :(')
    }

    // Successful registeration
    // set a cookie
    req.session.user = {};
    req.session.user.id = newUser.id;
    req.session.sessionID = req.sessionID;
    return res.send(req.session);
})

// Get a particular user by its id
router.get('/:id', async (req, res) => {
    res.send('user with id '+req.params.id)
})

// Edit the creds of a user by id 
router.post('/:id/edit', async (req, res) => {
    res.send('user with id '+req.params.id+' edited!')
})

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(img|jpg|jpeg|png)$/)) {
            return cb(undefined, true);
        } else {
            return cb(new Error('Please upload valid image files'));
        }
    }
})

// Post user avatar 
router.post(':/id/avatar', upload.single('avatar'), async(req, res) => {
    res.send('uploaded');
})

// delete a user
router.delete('/:id', async (req, res) => {
    res.send('deleted');
})

module.exports = router;