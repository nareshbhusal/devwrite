const Tag = require('../../models/Tag');
const sequelize = require('sequelize');

const getTagCloud = async() => {
    const res = await Tag.findAll({
        attributes: [
            'tagName',
            [sequelize.fn('count', sequelize.col('tagName')), 'frequency']
        ],
        group: ['tagName']
      })

    return res;
}

module.exports = getTagCloud;