const getUser = require('../../controllers/user/getUser');
const updateUser = require('../../controllers/user/updateUser');

const followUser = async(req, res) => {
    try {
        const followerId = parseInt(req.session.user.id);
        const followeeId = parseInt(req.params.id);

        // Add followerId to the followee user's followers column
        const followee = await getUser({ id: followeeId });
        const followers = followee.followers || [];
        const followerIndex = followers.indexOf(followerId);

        let toFollow;
        if (followerIndex === -1) {
            toFollow = true;
            // follow if not already followed
            followers.push(followerId);
        } else {
            toFollow = false;
            followers.splice(followerIndex, 1);
        }

        await updateUser(followeeId, { followers });
        // Add followeeid to the followers following column
        const follower = await getUser({ id: followeeId });
        
        const following = follower.following || [];
        if (toFollow) {
            following.push(followeeId);
        } else {
            following.splice(followeeId, 1);
        }

        await updateUser(followerId, { following });
        if (toFollow) {
            return res.status(200).send({ msg: 'Following' });
        } else {
            return res.status(200).send({ msg: 'Unfollowed' });
        }
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong following this user'});
    }
}

module.exports = followUser;