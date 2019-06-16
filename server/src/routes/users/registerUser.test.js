const request = require('supertest');
const app = require('../../index');
const User = require('../../models/User');

const user1 = {
    name: 'register-test-user',
    password: 'pverhper',
    email: 'register-test-user@gmail.com'
}

beforeEach(async () => {
    await User.destroy({
        where: {},
        truncate: true
      });
})

test('Should register user and receive 201', async() => {
    await request(app).post('/users').send({
        name: 'test',
        email: 'test@gmail.com',
        password: 'whatever'
    }).expect(201);
})

test('Should get 409 while registering user', async () => {
    await User.create(user1);
    await request(app).post('/users')
        .send(user1).expect(409);
})

afterEach(async() => {
    await User.destroy({
        where: {},
        truncate: true
    });
})