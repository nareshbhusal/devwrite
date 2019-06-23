const Sequelize = require('sequelize');
const db = require('../config/database');

const tag = db.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: Sequelize.INTEGER,
    },
    tagName: {
        type: Sequelize.STRING,
    }
})

module.exports = tag;