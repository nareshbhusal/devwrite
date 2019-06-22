const express = require('express');
const router = express.Router();
const getPosts = require('./getPosts');
const getPostById = require('./getPostById');
const createPost = require('./createPost');

const likePost = require('./likePost');
const savePost = require('./savePost');

const deletePost = require('./deletePost');

const commentRoutes = require('./comments/index');

const requireLogin = require('../../middlewares/requireLogin');

router.get('/:sortorder/', getPosts);
router.get('/:id', getPostById);
router.post('/', requireLogin, createPost);

router.post('/:id/like', requireLogin, likePost);
router.post("/:id/save", requireLogin, savePost);
router.delete('/:id', requireLogin, deletePost);

router.use('/:postid/comment', commentRoutes);

module.exports = router;