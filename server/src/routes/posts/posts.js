const express = require('express');
const router = express.Router();
const getUser = require('../../controllers/user/getUser');
const getPost = require('../../controllers/post/getPost');
const createPost = require('../../controllers/post/createPost');
const updatePost = require('../../controllers/post/updatePost');
const deletePost = require('../../controllers/post/deletePost');
const postComment = require('../../controllers/post/postComment');
const updateUser = require('../../controllers/user/updateUser');
const requireLogin = require('../../middlewares/requireLogin');

// Create a post
//post
router.get('/', requireLogin, async (req, res) => {
    //const post = req.body || {};
    let post = { ...req.query };

    const errors = []
    if (!post.title, !post.about, !post.body) {
        errors.push({ err: 'Please fill in all field!' });
        return res.send(errors);
    }
    try {
        post = { ...req.query };
        const userId = req.session.user.id;

        await createPost(userId, post);

        return res.status(200).send({ msg: 'Done!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong!')
    }
})

// Get a particular post by its id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await getPost({ id });
        if (!post) {
            return res.send([{err: '404! no such post found'}]);
        }
        return res.status(300).send(post);
    } catch(err) {
        console.log(err);
        res.send('Something went wrong!');
    }
})

// Edit the creds of a post by id 
//put
router.get('/:id/edit', requireLogin, async (req, res) => {
    
    try {
        const postId = req.params.id;
        const userId = req.session.user.id;
        // const upDatedPost = req.body || {};
        const upDatedPost = { ...req.query };
        // add edit timestamp
        upDatedPost.editedAt = new Date().getTime();
        const postData = {
            user: userId,
            id: postId
        };
        const post = await updatePost(postData, updatedPost);
        if (!post) {
            return res.send('This is awkward..hmmm...')
        }
        return res.send({ msg: 'Updated the post' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong');
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
        const postId = req.params.id;

        await postComment(comment, postId,  userId);
        
        return res.send({ msg: 'Comment posted' });
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

        const user = await getUser({ id: userId });
        let likedPosts = user.likedPosts || []; // user's all liked posts

        const post = await getPost({ id: postId });
        let likedBy = post.likedBy || []; // post's likers

        const alreadyLiked = likedBy.some(liker => {
            return liker === userId;
        });
        if (alreadyLiked) {
            // if the post was already liked by the user

            // update likedBy on post
            likedBy.splice(likedBy.indexOf(userId), 1);

            await updatePost({ likedBy }, { id: postId });
            //update likedPosts on user table
            likedPosts.splice(likedPosts.indexOf(postId), 1);

            await updateUser(userId, { likedPosts });

            return res.send({ msg: 'Unliked the post' });

        } else {
            // if not liked already
            // update likedBy on post
            likedBy.push(parseInt(userId));
            await updatePost({ id: postId }, { likedBy });

            //update likedPosts on user
            likedPosts.push(parseInt(postId));

            await updateUser(id, { likedPosts });

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

        const post = await getPost({ id: postId });
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
        await updatePost({ id: postId }, { comments });
        // update user
        const user = await getUser({ id: userId });
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

        await updateUser(userId, { commentedPosts });

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

        await deletePost(
            { 
                user: userId,
                id: postId
            }
        );

        return res.send({ msg: 'Deleted post!' });
    } catch(err) {
        console.log(err);
        return res.send('Something went wrong deleting post')
    }
})


module.exports = router;