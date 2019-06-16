const updateUser = require('./updateUser');

// takes the user fetched from the database freshly,
// and updates it's session_ids on the database
// logic -- keep number of session id below 5

const updateSessionIDs = async (user, sessionID) => {

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
        await updateUser(user.id, { session_ids });
    } catch(err) {
        console.log(err);
    }
}

module.exports = updateSessionIDs;