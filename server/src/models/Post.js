const Sequelize = require('sequelize');
const db = require('../config/database');

const post = db.define('post', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    user: {
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.STRING
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    comments: {
        // json with objects users and their comments and time of commenting
        type: Sequelize.JSON
    },
    createdAt: {
        type: Sequelize.STRING
    },
    editedAt: {
        type: Sequelize.STRING
    },
    likedBy: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
})

module.exports = post;