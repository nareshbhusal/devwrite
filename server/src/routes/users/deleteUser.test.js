const request = require('supertest');
const User = require('../../models/User');
const app = require('../../index');

const user2 = {
    name: 'login-test-user',
    password: 'pverhper',
    email: 'login-test-user@gmail.com'
}

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

test('Should delete user', async () => {
    const newUser = await User.create(user2);
    await request(app).post('/login').send(user2);
    const userId = newUser.id;
    await request(app).post(`/users/${userId}/delete`).send().expect(200);
    await request(app).post('/logout').send();
})