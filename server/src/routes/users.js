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

router.get('/me', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.session.user.id
            }
        });
        return res.send(user);
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Something went wrong fetching your profile :(' });
        return res.send(errors);
    }
})

// Register a user
//post
router.get('/register', async (req, res) => {
    // const user = { ...req.body } || {};
    const user = { ...req.query };
    console.log(user);

    // server side validation
    const errors = [];
    if (!user.name || !user.password || !user.email) {
        errors.push({ err: 'Please fill all fields' });
        return res.send(errors);
    }

    // see if email already exists
    const userInRecords = await User.findOne({
        where: {
            email: user.email
        }
    });
    if (userInRecords) {
        errors.push({ err: 'Email is already in use!' })
        return res.send(errors);
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
    req.session.user = {};
    req.session.user.id = newUser.id;
    req.session.sessionID = req.sessionID;
    return res.send(req.session);
})

// Get a particular user by its id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: {
                id: id
            }
        });
        if (user) {
            return res.send(user);
        } else {
            const errors = [{ err: '404. User not found' }]
            return res.send(errors);
        }
    } catch(err) {
        console.log(err);
        return res.send(404);
    }
})

// Edit the creds of a user by id 
//put
router.get('/:id/edit', async (req, res) => {
    //const updatedUserValues = req.body;
    if (req.session.user.id !=req.params.id) {
        const errors = [{ err: 'Can\'t perform this action as you are not logged in as this user!' }];
        return res.send(errors);
    }
    const updatedUserValues = { ...req.query };
    console.log(updatedUserValues);
    try {
        await User.update(
            { ...updatedUserValues },
            {
                where: {
                id: req.params.id
            }
        }
        );
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Something went wrong updating the user' });
        return res.send(errors);
    }
    return res.send('user with id '+req.params.id+' edited!')
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
});

// Post user avatar
router.post(':/id/avatar', upload.single('avatar'), async(req, res) => {
    res.send('uploaded');
})

// delete a user
//delete
router.get('/:id/delete', async (req, res) => {

    if (req.session.user.id !=req.params.id) {
        const errors = [{ err: 'Can\'t perform this action as you are not logged in as this user!' }];
        return res.send(errors);
    }
    try {
        const user = await User.destroy({
            where: {
                id: req.session.user.id
            }
        });
        if (!user) {
            return res.send({ msg: 'User never existed...that\'s awkward!' })
        } else {
            return res.send({ msg: 'Deleted successfully!' })
        }
        
    } catch(err) {
        console.log(err);
        const errors = [];
        errors.push({ err: 'Couldn\'t delete user' });
        return res.send(errors);
    }
})

module.exports = router;