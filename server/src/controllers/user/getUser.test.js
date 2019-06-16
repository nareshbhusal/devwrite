const User = require('../../models/User');
const getUser = require('./getUser');

const user1 = {
    name: 'getUser-test-user', 
    password: 'efihoroihrg',
    email: 'getUser-test-user@gmail.com'
}

beforeEach(async () => {
    await User.destroy({
        where: {},
        truncate: true
    });
})

test('Should get user', async() => {
    await User.create(user1);
    let user = await getUser(user1);
    user = {
        email: user.email,
        name: user.name,
        password: user.password
    };
    expect(user).toMatchObject(user1);
})

afterEach(async() => {
    await User.destroy({
        where: {},
        truncate: true
    });
})