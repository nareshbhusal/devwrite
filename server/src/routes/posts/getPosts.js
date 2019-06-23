const Post = require('../../models/Post');
const Tag = require('../../models/Tag');
const sequelize = require('sequelize');
const isLoggedIn = require('../../controllers/isLoggedIn');
const parsePost = require('../../controllers/post/parsePost');

const postsPerBatch = 10;

const getQueryConfig = ({ tag='', page, days, sortorder, search='' }) => {
    const offset = postsPerBatch * (page-1);
    const queryConfig = {
        where: {},
        limit:postsPerBatch,
        offset
    }

    if (sortorder==='top') {
        let startTime = new Date();
        startTime.setHours(startTime.getHours() - parseInt(days)*24);
        let endTime = new Date();
        startTime=startTime.getTime().toString();
        endTime=endTime.getTime().toString();

        queryConfig.order = [
            ['numOfLikes', 'DESC']
        ];
        if (days !=='all') {
            queryConfig.where = {
                createdAt: {
                    [sequelize.Op.between]: [startTime, endTime]
                }
            }
        }

    } else {
        // sortorder - `new`
        queryConfig.order = [
            ['createdAt', 'DESC']
        ]
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

        if (search) {
            queryConfig.include[0].where.title = {
                [sequelize.Op.iLike]: `%${searh}%`
            }
        }
    }
    if (search && !tag) {
        queryConfig.include = [{
            model: Tag,
            having: ["postId = id"],
            where: {
                title: {
                    [sequelize.Op.iLike]: `%${searh}%`
                }
            },
            required: true
        }];
    }
    return queryConfig;
}

/*

**********ROUTES**********
>    /posts/new?page=x
>    /posts/top?t=DAYS?page=x

*/

const getPosts = async (req, res, next) => {
    try {
        const { sortorder } = req.params;
        const { t, page, tag, search } = req.query;
        const days = t;

        if (sortorder !=='top' && sortorder !=='new') {
            return next();
        }
        const queryConfig = getQueryConfig({ tag, page, days, sortorder, search });
        Post.belongsTo(Tag, {targetKey:'postId',foreignKey: 'id'});
        const posts = await Post.findAll(queryConfig);
        
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