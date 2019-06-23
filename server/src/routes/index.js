const router = require('express').Router();

const authRouter = require('./auth');
const postsRouter = require('./posts');
const usersRouter = require('./users');
const tagsRouter = require('./tag/index');

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);

module.exports = router;