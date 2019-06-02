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
//         return res.send(posts);
//     } catch(err) {
//         console.log(err);
//         return res.send('Something went wrong fetching posts');
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
router.get('/:id/edit', async (req, res) => {
    
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
router.get('/:id/comment', async (req, res) => {

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
        let comments = JSON.parse(user.commentedPosts) || [];
        comment = {
            comment: comment.comment,
            createdAt: new Date().getTime(),
            post: req.params.id
        }
        comments.push(comment);
        comments = await JSON.stringify(comments);

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
        comments = await JSON.parse(post.comments) || [];
        comments.push(comment);
        comments = await JSON.stringify(comments);
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
router.get('/:id/like', async(req, res) => {
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
        let likedPosts = user.likedPosts; // user's liked posts
        let likedBy = post.likedBy; // posts likers

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
            likedPosts.splice(likedPosts.indexOf(postId));

            await User.update(
                { likedPosts: likedPosts },
                {
                    where: {
                        id: userId
                    }
                }
            );

        } else {
            // if not liked already
            // update likedBy on post
            likedBy = likedBy.push(userid);
            await Post.update(
                { likedBy: likedBy },
                {
                    where: {
                        id: postId
                    }
                }
            );
            //update likedPosts on user
            likedPosts.push(postid);

            await User.update(
                { likedPosts: likedPosts },
                {
                    where: {
                        id: userId
                    }
                }
            )
        }
    } catch(err) {
        consoele.log(err);
        return res.send('Something went wrong!');
    }
})

// Delete comment
//post
router.get('/:id/comment/:timestamp/delete', async(req, res) => {
    try {
        const timestamp = req.params.timestamp;
        console.log(timestamp);
        const postId = req.params.id;
        const userId = req.session.user.id;

        const post = await Post.findOne({
            where: {
                id: postId
            }
        });
        const comments = post.comments;
        const commentIndex = comments.findIndex(comment => {
            return comment.createdAt === timestamp && userId === comment.user 
        });
        if (!commentIndex) {
            return res.send('Something doesn\'t feel right')
        }
        comments.splice(commentIndex, 1);

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
        const commentedPostindex = commentedPosts.findIndex(comment => {
            return comment.createdAt === timestamp && comment.post == postId
        });
        if (commentedPostindex) {
            commentedPosts.splice(commentedPostindex);
        }
        commentedPosts = commentedPosts;

        await User.update(
            { commentedPosts: commentedPosts },
            {
                where: {
                    id: userId
                }
            }
        )

        return res.send({ msg: 'Deleted comment successfully!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong');
        
    }
})

// delete a post
router.delete('/:id', async (req, res) => {
    res.send('deleted');
})


module.exports = router;