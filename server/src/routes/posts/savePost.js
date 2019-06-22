const User = require('../../models/User');
const updateUser = require('../../controllers/user/updateUser');

const savePost = async(req, res) => {
    try {
        const userId = req.session.user.id;
        const postId = parseInt(req.params.id); 

        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        let savedPosts = user.savedPosts || [];
        let toSave = false;

        if (savedPosts.indexOf(postId) ===-1) {
            // not saved
            toSave = true;
            savedPosts.push(postId);
        } else {
            // saved already
            savedPosts.splice(savedPosts.indexOf(postId), 1);
        }
        // console.log(savedPosts);
        await updateUser(userId, { savedPosts });

        return res.status(200).send({ msg: `${toSave ? 'Saved' : 'Unsaved'} post!` });
    }
    catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'Server error while saving post :(' })
    }
}

module.exports = savePost;