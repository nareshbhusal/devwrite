const updateSessionIDs = require('../../controllers/user/updateSessionIDs');
const addCookie = require('../../controllers/user/addCookie');
const getUser = require('../../controllers/user/getUser');

const login = async(req, res) => {
    const user = {...req.body};
    // const user = {...req.query};

    // server side validation
    if (!user.email || !user.password) {
        const error = { err: 'Please fill in all fields' };
        return res.status(401).send(error);
    }

    try {
        const userInRecords = await getUser(user);

        if (userInRecords) {
            // login successful
            await updateSessionIDs(userInRecords, req.sessionID);
            // set user on cookie
            addCookie(req, userInRecords);
            return res.status(200).send({ msg: 'Logged in!' });

        } else {
            // creds don't match
            return res.status(401).send({ err: 'Wrong password or username!' });
        }
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong logging in!'})
    }
}

module.exports = login;