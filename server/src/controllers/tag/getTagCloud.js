const Tag = require('../../models/Tag');
const sequelize = require('sequelize');

const getTagCloud = async(numOfTags=25) => {
    const tags = await Tag.findAll({
        attributes: [
            'tagName',
            [sequelize.fn('count', sequelize.col('tagName')), 'frequency']
        ],
        group: ['tagName'],
        order: [[sequelize.fn('count', sequelize.col('tagName')), 'DESC']]
      })

    return tags.slice(0,numOfTags);
}

module.exports = getTagCloud;