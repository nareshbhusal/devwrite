const User = require('../../models/User');
const updateUser = require('./updateUser');

const user1 = {
    name: 'updateUser-test-user',
    email: 'updateUser-test-user@gmail.com',
    password: 'efihefepf'
}

const updatedEmail = 'updateUser-test-user@gmail.com';

beforeEach(async() => {
    await User.destroy({
        where: {},
        truncate: true
    });
})

afterEach(async() => {
    await User.destroy({
        where: {},
        truncate: true
    });
})

test('Should get updated user', async() => {
    const user = await User.create(user1);
    id = user.id;
    await updateUser(id, { email: updatedEmail });
    const updatedUser = await User.findOne({
        where: {
            id: id
        }
    });
    expect(updatedUser.email).toBe(updatedEmail);
})