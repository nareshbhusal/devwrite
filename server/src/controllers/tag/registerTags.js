const Tag = require('../../models/Tag');

const registerTags = async(tags, postId) => {

    const tagColumns = tags.map(tagName => {
        return { tagName, postId }
    });

    await Tag.bulkCreate({
        tagColumns
    });
}

module.exports = registerTags;