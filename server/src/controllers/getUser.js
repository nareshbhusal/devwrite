const User = require('../models/User');

const getUser = async () => {
    const userInRecords = await User.findOne({
        where: {
            ...user
        }
    });
    return userInRecords;
}

module.exports = getUser;