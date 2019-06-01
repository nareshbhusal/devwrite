const express = require('express');
const multer = require('multer');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    res.send('users');
})

// Register a user
router.post('/register', async (req, res) => {
    res.send('create a post');
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