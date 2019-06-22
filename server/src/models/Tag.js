const Sequelize = require('sequelize');
const db = require('../config/database');

const tag = db.define('tag', {

    postId: {
        type: Sequelize.INTEGER,
    },
    tagName: {
        type: Sequelize.STRING,
        primaryKey: true
    }
})

module.exports = tag;