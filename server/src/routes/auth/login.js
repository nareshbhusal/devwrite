const updateSessionIDs = require('../../controllers/user/updateSessionIDs');
const addCookie = require('../../controllers/user/addCookie');
const getUser = require('../../controllers/user/getUser');

const login = async(req, res) => {
    const user = {...req.body};
    // const user = {...req.query};

    // server side validation
    const errors = [];
    if (!user.email || !user.password) {
        errors.push({ err: 'Please fill in all fields' });
        return res.status(401).send(errors);
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
            errors.push({ err: 'Wrong password or username!' })
            return res.status(400).send(errors);
        }
        
    } catch(err) {
        console.log(err);
        return res.status(500).send('Something went wrong logging in!')
    }
}

module.exports = login;