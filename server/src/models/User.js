const Sequelize = require('sequelize');
const db = require('../config/database');

const user = db.define('user', {

    name: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
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
        type: Sequelize.STRING
    },
    followers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    following: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    likedPosts: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    commentedPosts: {
        // object with comment body, created time & edited time of the comment and id of the post
        type: Sequelize.JSON
    },
    session_ids: {
        type: Sequelize.STRING
    }
})

module.exports = user;