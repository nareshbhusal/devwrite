const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        if (!posts.length) {
            return res.send('404. No posts found!');
        }
        return posts;
    } catch(err) {
        console.log(err);
    }
})

// Create a post
router.post('/', async (req, res) => {
    //const post = req.body || {};
    let post = { ...req.query };
    post.user = req.session.user.id;
    const errors = []
    if (!post.title, !post.about, !post.body) {
        errors.push({ err: 'Please fill in all field!' });
        return res.send(errors);
    }
    try {
        post = { ...req.query };
        post.user = req.session.user.id;
        post = await Post.create(post);
        console.log('CREATED THE POST');
        // get the user
        const user = await User.findOne({
            where: {
                id: req.session.user.id
            }
        })
        console.log('FOUND THE USER');
        // update the posts id column in the database on user table
        let posts = user.posts || [];
        posts.push(parseInt(post.id));
        console.log(posts);

        await User.update(
            { 
                posts 
            },
            {
                where: {
                id: req.session.user.id
            }
        }
        );
        return res.status(200).send({ msg: 'Done!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong!')
    }
})

// Get a particular post by its id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!post) {
            return res.send('404! no such post found');
        }
        return res.status(300).send(post);
    } catch(err) {
        console.log(err);
        res.send('Something went wrong!');
    }
})

// Edit the creds of a post by id 
//post
router.get('/:id/edit', async (req, res) => {
    try {
        // const upDatedPost = req.body || {};
        const upDatedPost = { ...req.query };
        const post = await Post.update(
            { ...upDatedPost },
            {
                where: {
                user: req.session.user.id,
                id: req.params.id
            }
        }
        );
        if (!post) {
            return res.send('This is awkward..hmmm...')
        }
        return res.send({ msg: 'Updated the post' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong')
    }
})

// delete a post
router.delete('/:id', async (req, res) => {
    res.send('deleted');
})


module.exports = router;