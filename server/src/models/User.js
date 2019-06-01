const Sequelize = require('sequelize');
const db = require('../config/database');

const user = db.define('user', {
    id: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.STRING
    },
    website: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    },
    posts: {
        // array of posts' ids
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    createdAt: {
        type: Sequelize.INTEGER
    },
    folowers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    following: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    likedPosts: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
})

module.exports = user;