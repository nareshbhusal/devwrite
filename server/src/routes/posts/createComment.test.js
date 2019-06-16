const Post = require('../../models/Post');
const app = require('../../index');
const request = require('supertest');


const user1 = {
    name: 'createComment-test-user',
    password: 'pverhper',
    email: 'createComment-test-user@gmail.com'
}

beforeEach(async() => {
    await Post.destroy({
        where: {},
        truncate: true
    });
    await User.destroy({
        where: {},
        truncate: true
    });
    
    await User.create(user1);
})

// test('Should create a comment', async() => {
//     await request(app).post('')
// })