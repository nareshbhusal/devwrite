const Sequelize = require('sequelize');
const db = require('../config/database');

const user = db.define('user', {
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
    }
})

module.exports = user;