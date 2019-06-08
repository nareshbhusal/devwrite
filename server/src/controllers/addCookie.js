// @ param req is the request object
// @param user is the user fetched from the database
// function sets data to the cookie

const addCookie = (req, user) => {
    req.session.user = {};
    req.session.user.id = userInRecords.id;
}

module.exports = addCookie;