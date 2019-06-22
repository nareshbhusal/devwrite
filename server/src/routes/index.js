const router = require('express').Router();

const authRouter = require('./auth');
const postsRouter = require('./posts');
const usersRouter = require('./users');

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);

module.exports = router;