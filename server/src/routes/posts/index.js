const express = require('express');
const router = express.Router();
const getPosts = require('./getPosts');
const getPostById = require('./getPostById');
const createPost = require('./createPost');
const createComment = require('./createComment');
const likePost = require('./likePost');
const deleteComment = require('./deleteComment');
const deletePost = require('./deletePost');

const requireLogin = require('../../middlewares/requireLogin');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', requireLogin, createPost);
router.put('/:id/comment', requireLogin, createComment);
router.put('/:id/like', requireLogin, likePost);
router.post('/:id/comment/:timestamp/delete', requireLogin, deleteComment);
router.post('/:id/delete', requireLogin, deletePost);

module.exports = router;