const Post = require('../../models/Post');
const User = require('../../models/User');
const getPost = require('./getPost');

const clearDB = async() => {
    await User.destroy({
        where:{},
        truncate:true
    })
    await Post.destroy({
        where: {},
        truncate: true
    })
}

const user1 = {
    name: 'createPost-test-user',
    email: 'createPost-test-user@gmail.com',
    password: 'rohreohrepo',
}

const tags = ['tag1', 'tag2', 'tag3'];

const post1 = {
    title: 'title of the test post',
    body: 'test post body',
    about: 'test post',
    tags: tags.join(' ')
}

beforeEach(async() => {
    await clearDB();
    const user = await User.create(user1);
    post1.user = user.id;
    const post = await Post.create(post1);
    console.log('THE POST',post);
})

afterEach(async() => {
    await clearDB();
})

test('Should get the post', async() => {
    const post = await getPost(post1);
    expect(post.title).toBe(post1.title);
    expect(post.id).not.toBeFalsy();
    console.log('********', post.id);
})