const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('users');
})

router.post('/register', async (req, res) => {
    res.send('create a post');
})

router.get('/:id', async (req, res) => {
    res.send('user with id '+req.params.id)
})

module.exports = router;