const app = require('../../index');
const request = require('supertest');
const User = require('../../models/User');

const user2 = {
    name: 'login-test-user',
    password: 'pverhper',
    email: 'login-test-user@gmail.com'
}

beforeEach(async () => {
    await User.destroy({
        where: {},
        truncate: true
    });
})

afterEach(async () => {
    await User.destroy({
        where: {},
        truncate: true
    });
})

test('Should login the user', async () => {
    await User.create(user2);
    await request(app).post('/login').send({
        email: user2.email,
        password: user2.password
    }).expect(200);
})

test('Wrong password should get 400', async () => {
    await request(app).post('/login').send({
        email: user2.email,
        password: 'invalid_pass'
    }).expect(400);
})

test('Wrong username should throw 400', async () => {
    await request(app).post('/login').send({
        email: 'invalid_email',
        password: user2.password
    }).expect(400);
})