const Post = require('../../models/Post');
const sequelize = require('sequelize');
const isLoggedIn = require('../../controllers/isLoggedIn');

const parsePost = require('../../controllers/post/parsePost');

const postsPerBatch = 10;

const getNewPosts = async(tag, batchNum=1, numberOfPosts=postsPerBatch) => {

    const offset = numberOfPosts * (batchNum-1);

    // TODO: add logic to only include posts with tags containing keyword `${tag}`

    const posts = await Post.findAll({
        where: {},
        limit:numberOfPosts,
        order: [
            ['createdAt', 'DESC']
        ],
        offset
    });
    // console.log(posts);

    return posts;
}

const getTopPosts = async(tag, batchNum=1, days=1, numberOfPosts=postsPerBatch) => {

    const offset = numberOfPosts * (batchNum-1);

    
    let startTime = new Date();
    startTime.setHours(startTime.getHours() - parseInt(days)*24);

    let endTime = new Date();

    startTime=startTime.getTime().toString();
    endTime=endTime.getTime().toString();

    const posts = await Post.findAll({
        where: {
            createdAt: {
                "$between": [startTime, endTime]
            }
        },
        limit:numberOfPosts,
        order: [
            [sequelize.fn('length', sequelize.col('likedBy')), 'DESC']
            // ['likedBy'.length, 'DESC']
        ],
        offset
    });
    // console.log(posts);
    return posts;
}

/*

/posts/new?page=x
/posts/top?t=DAYS?page=x

*/

const getPosts = async (req, res, next) => {
    try {
        const { sortorder } = req.params;

        if (sortorder !=='top', sortorder !=='new') {
            return next();
        }

        const { t, page, tag } = req.query;
        const numDays = t;

        let posts = [];
        if (sortorder==='new') {
            posts = await getNewPosts(tag, page);

        } else if (sortorder==='top') {
            posts = await getTopPosts(tag, page, numDays);
        }
        
        // parse post
        let userId;
        const loggedIn = await isLoggedIn(req);
        if (loggedIn) {
            userId = parseInt(req.session.user.id);
        }
        const parsedPosts = await parsePost(posts, userId);

        return res.status(200).send(parsedPosts);
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Something went wrong fetching posts'});
    }
}

module.exports = getPosts;