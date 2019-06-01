const Sequelize = require('sequelize');
const db = require('../config/database');

const user = db.define('post', {

    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    user: {
        type: Sequelize.INTEGER
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

module.exports = user;