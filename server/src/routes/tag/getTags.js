const getTagCloud = require('../../controllers/tag/getTagCloud');

const getTags = async(req, res) => {
    const numOfTags=25
    try {
        const tags = await getTagCloud(numOfTags);
        return res.status(200).send(tags);

    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: 'server error fetching tag cloud' })
    }
}

module.exports = getTags;