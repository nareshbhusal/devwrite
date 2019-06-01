const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.findAll();
//         if (!posts.length) {
//             return res.send('404. No posts found!');
//         }
//         return posts;
//     } catch(err) {
//         console.log(err);
//     }
// })

// Create a post
//post
router.get('/', async (req, res) => {
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
    res.send('post with id '+req.params.id)
})

// Edit the creds of a post by id 
router.post('/:id/edit', async (req, res) => {
    res.send('post with id '+req.params.id+' edited!')
})

// delete a post
router.delete('/:id', async (req, res) => {
    res.send('deleted');
})


module.exports = router;