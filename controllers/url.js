// const shortId = require('shortId');
const shortID = require('shortid');
const URL = require("../models/url");

const handelGenerateNewShortUrl = async (req, res) => {
    console.log(req.body)
    const body = req.body;
    if (!body.url) return res.status(400).send(`<h1>please enter url</h1>`);

    const shortId1 = /* shortID(); */ 'TBrY5yREY'
    const shortId2 = shortID();


    await URL.create({
        shortId: {
            shortId1,
            shortId2
        },
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: {shortId1, shortId2} })
}

const handelGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    // return res.json({
    //     totalClicks: result.visitHistory.length,
    //     analytics: result.visitHistory
    // })

    return res.render('pages/url-analytics/url-analytics.pug', {
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory
    })
}

module.exports = {
    handelGenerateNewShortUrl,
    handelGetAnalytics
}

