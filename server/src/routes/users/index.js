const express = require('express');
const router = express.Router();
const getUsers = require('./getUsers');
const registerUser = require('./registerUser');
const getCurrentUser = require('./getCurrentUser');
const getUserById = require('./getUserById');
const followUser = require('./followUser');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');

router.get('/', getUsers);
router.post('/', registerUser);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.put(':/id', editUser);
router.post(':/id/delete', deleteUser);
router.put('/:id/follow', followUser);


module.exports = router;