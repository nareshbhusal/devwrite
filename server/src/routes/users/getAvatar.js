const User = require('../../models/User');

const getAvatar = async(req, res) => {
    try {
        const id = req.params.id;
        if (!id){
            throw "no id. Prob not logged in"
        }
        const user = await User.findOne({
            where: {
                id
            },
            attributes: ['photo']
        });
        return res.send(user.photo);
    } catch(err) {
        console.log(err);
        return res.send('');
    }
}

module.exports = getAvatar;