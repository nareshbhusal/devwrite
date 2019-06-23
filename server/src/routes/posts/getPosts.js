const Post = require('../../models/Post');
const Tag = require('../../models/Tag');
const sequelize = require('sequelize');
const isLoggedIn = require('../../controllers/isLoggedIn');

const parsePost = require('../../controllers/post/parsePost');

const postsPerBatch = 10;

const getNewPosts = async(tag='', batchNum=1, numberOfPosts=postsPerBatch) => {

    const offset = numberOfPosts * (batchNum-1);

    // TODO: add logic to only include posts with tags containing keyword `${tag}`
    Post.belongsTo(Tag, {targetKey:'postId',foreignKey: 'id'});

    const posts = await Post.findAll({
        where: {},
        limit:numberOfPosts,
        order: [
            ['createdAt', 'DESC']
        ],
        offset,
        // include: [{
        //     model: Tag,
        //     having: ["postId = id"],
        //     // where: {
        //     //     tagName: {
        //     //         [sequelize.Op.iLike]: `%${tag}%`
        //     //     }
        //     // },
        //     required: true
        // }]
    });
    console.log(posts.length);

    return posts;
}

const getTopPosts = async(tag='', batchNum=1, days=1, numberOfPosts=postsPerBatch) => {

    const offset = numberOfPosts * (batchNum-1);

    
    let startTime = new Date();
    startTime.setHours(startTime.getHours() - parseInt(days)*24);

    let endTime = new Date();

    startTime=startTime.getTime().toString();
    endTime=endTime.getTime().toString();

    Post.belongsTo(Tag, {targetKey:'postId',foreignKey: 'id'});
    const posts = await Post.findAll({
        where: {
            createdAt: {
                [sequelize.Op.between]: [startTime, endTime]
            }
        },
        limit:numberOfPosts,
        order: [
            ['numOfLikes', 'DESC']
        ],
        offset,
        include: [{
            model: Tag,
            having: ["postId = id"],
            where: {
                tagName: {
                    // [sequelize.Op.iLike]: `%${tag}%`
                }
            },
            required: true
        }]
    });
    return posts;
}

/*

**********ROUTES**********
>    /posts/new?page=x
>    /posts/top?t=DAYS?page=x

*/

const getPosts = async (req, res, next) => {
    try {
        const { sortorder } = req.params;
        const { t, page, tag } = req.query;
        const numDays = t;
        
        if (sortorder !=='top' && sortorder !=='new') {
            return next();
        }
        console.log(sortorder, numDays, page, tag);

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