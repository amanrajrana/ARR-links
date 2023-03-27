// const shortId = require('shortId');
const shortID = require('shortid');
const URL = require("../models/url");

const handelGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url not found"});

    const shortId = shortID();
    console.log(`short id is ${shortId}`)

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({id: shortId})
}

module.exports = {
    handelGenerateNewShortUrl
}