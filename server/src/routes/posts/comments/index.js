const express = require('express');
const router = express.Router({ mergeParams : true });
const requireLogin = require('../../../middlewares/requireLogin');

const getComment = require('./getComment');
const createComment = require('./createComment');
const editComment = require('./editComment');
const deleteComment = require('./deleteComment');
const likeComment = require('./likeComment');

router.get('/:commentid', getComment);
router.post('/', requireLogin, createComment);
router.put('/:commentid', requireLogin, editComment);
router.delete('/:commentid', requireLogin, deleteComment);

router.post('/:commentid/like', requireLogin, likeComment);

module.exports = router;