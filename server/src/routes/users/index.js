const express = require('express');
const router = express.Router();
const getUsers = require('./getUsers');
const registerUser = require('./registerUser');
const getCurrentUser = require('./getCurrentUser');
const getUserById = require('./getUserById');
const getAvatar = require('./getAvatar');
const followUser = require('./followUser');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');

const requireLogin = require('../../middlewares/requireLogin');

router.get('/', getUsers);
router.get('/:id/avatar', getAvatar);
router.post('/', registerUser);
router.get('/me', requireLogin, getCurrentUser);
router.get('/:id', getUserById);
router.put('/:id', requireLogin, editUser);
router.delete('/:id/delete', requireLogin, deleteUser);
router.post('/:id/follow', requireLogin, followUser);


module.exports = router;