const generateShortID = require("../utils/shortID");
const URL = require("../models/url");
require("dotenv").config({ path: ".env.local" });

const redirectServerHost = process.env.REDIRECT_SERVER_HOST;

const handelGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    res.status(401).send({
      success: false,
      message: "body can not be empty",
    });
  }

  const shortId = generateShortID(6);

  try {
    // enter first shortid
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
    return;
  }

  // 201 -> created
  res.status(201).send({
    success: true,
    message: "Data saved successfully",
    shortUrl: `${redirectServerHost}/${shortId}`,
  });
};

const handelGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.render("pages/url-analytics/url-analytics.pug", {
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handelGenerateNewShortUrl,
  handelGetAnalytics,
};
