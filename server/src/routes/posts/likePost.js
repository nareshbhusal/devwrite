
const getUser = require('../../controllers/user/getUser');
const getPost = require('../../controllers/post/getPost');
const updatePost = require('../../controllers/post/updatePost');
const updateUser = require('../../controllers/user/updateUser');

// route to like posts
const likePost = async (req, res) => {
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

            await updatePost({ id: postId }, { likedBy });
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

            await updateUser(userId, { likedPosts });

            return res.send({ msg: 'Liked the post' })
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send('Something went wrong!');
    }
}

module.exports = likePost;