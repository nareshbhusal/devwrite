const Sequelize = require('sequelize');

module.exports = new Sequelize('mediumdb', 'postgres', 'nnnsss333', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max:5,
        min: 0,
        acquire: 30000,
        idle: 1000
    },
    define : {
        timestamps: false
    }
})