const updateUser = require('./updateUser');

const clearSession = async (req, user) => {
    let session_ids = user.session_ids;
    session_ids = session_ids.split(',').filter(session_id => {
        return session_id !== req.sessionID
    }).toString();

    await updateUser(id, { session_ids });

    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
    });
}

module.exports = clearSession;