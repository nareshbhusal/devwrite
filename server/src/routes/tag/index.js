const express = require('express');
const router = express.Router();
const getTags = require('./getTags');

router.get('/', getTags);

module.exports = router;