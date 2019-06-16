const express = require('express');
const router = express.Router();
const login = require('./login');
const logout = require('./logout');

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;