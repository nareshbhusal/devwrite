const User = require('../models/User');

// @param id - user id
// @param dataToUpdate - object with user data to update

const updateUser = async (id, dataToUpdate) => {
    await User.update(
        { ...dataToUpdate },
        {
            where: {
                id
            }
        }
    )
}

module.exports = updateUser;