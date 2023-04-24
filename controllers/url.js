// const shortId = require('shortId');
const shortID = require('shortid');
const URL = require("../models/url");

const handelGenerateNewShortUrl = async (req, res) => {
    console.log(req.body)
    const body = req.body;
    if (!body.url) {
        return res.render('pages/home/home.pug',{ 
            isShortIdGenerate: false,
            errorMsg: 'Please enter url' 
        })
    }

    // create 2 shortIDs for the long url 
    const shortId1 = shortID();
    const shortId2 = shortID();

    try {
         // enter first shortid
        await URL.create({
            shortId: shortId1,
            redirectURL: body.url,
            visitHistory: [],
        }); 

        // Insert second shortid 
        await URL.create({
            shortId: shortId2,
            redirectURL: body.url,
            visitHistory: [],
        });

    } catch (error) {

        // 400 -> bad request
        res.status(400).send({ 
            success: false, 
            message: 'Something went wrong',
        });
    }
   
    // 201 -> created
    res.status(201).send({ 
        success: true, 
        message: 'Data saved successfully',
        shortId1, 
        shortId2 
    });
}

const handelGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    

    return res.render('pages/url-analytics/url-analytics.pug', {
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handelGenerateNewShortUrl,
    handelGetAnalytics
}

