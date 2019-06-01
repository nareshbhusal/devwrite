const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
    res.send('login');
})

router.get('/logout', async (req, res) => {
    res.send('logout');
})

module.exports = router;