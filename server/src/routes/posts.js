const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        if (!posts.length) {
            return res.send('404. No posts found!');
        }
        return res.send(posts);
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong fetching posts');
    }
})

// Create a post
//post
router.get('/', requireLogin, async (req, res) => {
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
        // add timestamp
        post.createdAt = new Date().getTime();
        post = await Post.create(post);
        // get the user
        const user = await User.findOne({
            where: {
                id: req.session.user.id
            }
        })
        // update the posts id column in the database on user table
        let posts = user.posts || [];
        posts.push(parseInt(post.id));

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
//put
router.post('/:id/edit', requireLogin, async (req, res) => {
    
    try {
        // const upDatedPost = req.body || {};
        const upDatedPost = { ...req.query };
        // add edit timestamp
        upDatedPost.editedAt = new Date().getTime();
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
        console.log(post);
        return res.send({ msg: 'Updated the post' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong')
    }
})

//Post a comment on a post
//post
router.get('/:id/comment', requireLogin, async (req, res) => {

    // Add the comment to both user model and the post model

    // const comment = req.body || {};
    let comment = { ...req.query } || {};
    const errors= [];
    if (!comment.comment) {
        errors.push({ err: 'Provide a comment body' });
        return res.send(errors);
    }
    try {
        //comment = req.body || {};
        let comment = { ...req.query } || {};
        const userId = req.session.user.id;

        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        let comments = user.commentedPosts;
        if (typeof(comments)==='string') {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        comment = {
            comment: comment.comment,
            createdAt: new Date().getTime(),
            post: req.params.id
        }
        comments.push(comment);

        // Push this to user table's commentedPosts column
        await User.update(
            { 
                commentedPosts: comments
            },
            {
                where: {
                    id: userId
                }
            }
        )

        // Push also to the post table
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        delete comment.post;
        comment.user = userId;
        comment.username = user.name;
        console.log(typeof post.comments);
        comments = post.comments;
        if (typeof(comments) === "string") {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        // comments = JSON.parse(JSON.stringify(comments).trim()) || [];
        console.log(typeof comments);
        comments.push(comment);
        comments = JSON.stringify(comments);
        await Post.update(
            { 
                comments: comments 
            },
            {
                where: {
                    id: req.params.id
            }
        }
        );
        return res.send({ msg: 'Commented posted' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong while commenting');
    }
})

// route to like posts
//post
router.get('/:id/like', requireLogin, async(req, res) => {
    // check to see if the user has already liked the post
    
    try {
        const postId = parseInt(req.params.id);
        const userId = parseInt(req.session.user.id);

        const post = await Post.findOne({
            where: {
                id: postId
            }
        });

        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        let likedPosts = user.likedPosts || []; // user's all liked posts
        let likedBy = post.likedBy || []; // posts likers

        const alreadyLiked = likedBy.some(liker => {
            return liker === userId;
        });
        if (alreadyLiked) {
            // if the post was already liked by the user

            // update likedBy on post
            likedBy.splice(likedBy.indexOf(userId), 1);

            await Post.update(
                { likedBy: likedBy },
                {
                    where: {
                        id: postId
                    }
                }
            );
            //update likedPosts on user
            likedPosts.splice(likedPosts.indexOf(postId), 1);

            await User.update(
                { likedPosts: likedPosts },
                {
                    where: {
                        id: userId
                    }
                }
            );

            return res.send({ msg: 'Unliked the post' });

        } else {
            // if not liked already
            // update likedBy on post
            console.log('likedBy', likedBy);
            likedBy.push(parseInt(userId));
            console.log('likedBy', likedBy);
            await Post.update(
                { likedBy: likedBy },
                {
                    where: {
                        id: postId
                    }
                }
            );
            console.log('update likedPosts on user')
            //update likedPosts on user
            likedPosts.push(parseInt(postId));

            await User.update(
                { likedPosts: likedPosts },
                {
                    where: {
                        id: userId
                    }
                }
            )

            return res.send({ msg: 'Liked the post' })
        }
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong!');
    }
})

// Delete comment
//post
router.get('/:id/comment/:timestamp/delete', requireLogin, async(req, res) => {
    try {
        const timestamp = req.params.timestamp;
        const postId = req.params.id;
        const userId = req.session.user.id;

        const post = await Post.findOne({
            where: {
                id: postId
            }
        });
        let comments = post.comments;
        if (typeof(comments) === 'string') {
            comments = JSON.parse(comments);
        }
        comments = comments || [];
        const commentIndex = comments.findIndex(comment => {
            return comment.createdAt == timestamp && userId == comment.user 
        });
        if (!commentIndex<0) {
            return res.send('Something doesn\'t feel right');
        }
        comments.splice(commentIndex, 1);
        comments = JSON.stringify(comments);

        // update post
        await Post.update(
            { comments },
            {
                where: {
                    id: postId
                }
            }
        )
        // update user
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        let commentedPosts = user.commentedPosts;
        if (typeof(commentedPosts) === 'string') {
            commentedPosts = JSON.parse(commentedPosts)
        }
        commentedPosts = commentedPosts || [];
        const commentedPostindex = commentedPosts.findIndex(comment => {
            return comment.createdAt == timestamp && comment.post == postId
        });

        if (commentedPostindex) {
            commentedPosts.splice(commentedPostindex, 1);
        }
        commentedPosts = JSON.stringify(commentedPosts);

        await User.update(
            { commentedPosts: commentedPosts },
            {
                where: {
                    id: userId
                }
            }
        );

        return res.send({ msg: 'Deleted comment successfully!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong');
    }
})

// delete a post
router.get('/:id/delete', requireLogin, async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const userId = parseInt(req.session.user.id);

        await Post.destroy({
            where: {
                user: userId,
                id: postId
            }
        });

        return res.send({ msg: 'Deleted post!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong deleting post')
    }
})


module.exports = router;