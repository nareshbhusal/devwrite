const Post = require('../../models/Post');
const Tag = require('../../models/Tag');
const sequelize = require('sequelize');
const isLoggedIn = require('../../controllers/isLoggedIn');

const parsePost = require('../../controllers/post/parsePost');

const postsPerBatch = 10;

const getNewPosts = async(tag='', batchNum=1, numberOfPosts=postsPerBatch) => {

    

    // TODO: add logic to only include posts with tags containing keyword `${tag}`
    Post.belongsTo(Tag, {targetKey:'postId',foreignKey: 'id'});

    console.log(posts.length);

    return posts;
}

const getQueryConfig = ({ tag='', page, days, sortorder }) => {

    const offset = numberOfPosts * (page-1);

    const queryConfig = {
        where: {},
        limit:numberOfPosts,
        offset
    }

    if (sortorder==='top') {
        queryConfig.order = ['numOfLikes', 'DESC']

    } else {
        // sortorder - `new`
        let startTime = new Date();
        startTime.setHours(startTime.getHours() - parseInt(days)*24);
        let endTime = new Date();
        startTime=startTime.getTime().toString();
        endTime=endTime.getTime().toString();

        queryConfig.order = ['createdAt', 'DESC']
        queryConfig.where = {
            createdAt: {
                [sequelize.Op.between]: [startTime, endTime]
            }
        }
    }

    if (tag) {
        queryConfig.include = [{
            model: Tag,
            having: ["postId = id"],
            where: {
                tagName: {
                    [sequelize.Op.iLike]: `%${tag}%`
                }
            },
            required: true
        }];
    }
}

const getTopPosts = async(tag='', batchNum=1, days=1, numberOfPosts=postsPerBatch) => {

    const offset = numberOfPosts * (batchNum-1);

    
    

    

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
        const days = t;
        if (sortorder !=='top' && sortorder !=='new') {
            return next();
        }

        const queryConfig = getQueryConfig({ tag, page, days, sortorder });

        Post.belongsTo(Tag, {targetKey:'postId',foreignKey: 'id'});
        let posts = await Post.findAll(queryConfig) || [];
        
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