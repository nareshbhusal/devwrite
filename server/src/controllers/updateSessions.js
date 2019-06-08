const User = require('../models/User');


// takes the user fetched from the database freshly,
    // and update it's session_ids 
    // logic -- keep number of session id below 5

const updateSessions = async (user, sessionID) => {

    let session_ids;
    session_ids = user.session_ids;
    if (session_ids) {
        session_ids = session_ids.split(',');
        if (session_ids.length > 4) {
            session_ids.pop();
        }
        session_ids.unshift(sessionID);
        session_ids = session_ids.toString();
    }

    try {
        await User.update(
            { session_ids },
            {
                where: {
                id: user.id
            }
        }
        );
    } catch(err) {
        console.log(err);
    }
}

module.exports = updateSessions;