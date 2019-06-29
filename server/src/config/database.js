const Sequelize = require('sequelize');
const { DB_NAME, HOST, DB_USER, DB_PASS } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: HOST,
    dialect: 'postgres',
    pool: {
        max:5,
        min: 0,
        acquire: 30000,
        idle: 1000
    },
    define : {
        timestamps: false
    },
    logging: false
})