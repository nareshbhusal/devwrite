const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('posts');
})

// Create a post
router.post('/', async (req, res) => {
    res.send('create post');
})

// Get a particular post by its id
router.get('/:id', async (req, res) => {
    res.send('post with id '+req.params.id)
})

// Edit the creds of a post by id 
router.post('/:id/edit', async (req, res) => {
    res.send('post with id '+req.params.id+' edited!')
})

// delete a post
router.delete('/:id', async (req, res) => {
    res.send('deleted');
})


module.exports = router;