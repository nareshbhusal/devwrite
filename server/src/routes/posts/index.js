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
router.post('/:id/comment', createComment);
router.post('/:id/like', likePost);
router.post('/:id/comment/:timestamp/delete', deleteComment);
router.post('/:id/delete', deletePost);



module.exports = router;