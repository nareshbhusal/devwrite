const createPost = require('./createPost');
const Post = require('../../models/Post');
const User = require('../../models/User');

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
    const post = await createPost(post1);
    console.log('THE POST',post);
})

afterEach(async() => {
    await clearDB();
})

test('Create a post', async() => {
    const post = await Post.findOne({
        where: {
            title: post1.title
        }
    });
    const user = await User.findOne({
        where: {
            email: user1.email
        }
    });
    const userId = user.id;
    expect(post.user).toBe(userId);
    expect(post.tags)
    .toEqual(tags);
})