const User = require('../../models/User');

// @param userData is an object with the user data to match in db

const getUser = async (userData) => {
    const userInRecords = await User.findOne({
        where: {
            ...userData
        }
    });
    return userInRecords;
}

module.exports = getUser;