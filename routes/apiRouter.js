const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { handelGenerateNewShortUrl, handelGetAnalytics } = require('../controllers/url');
const { handelGenerateQrCode } = require('../controllers/generateQrCode');


// Handling request using router
router.post("/short-url", handelGenerateNewShortUrl)
router.post("/qr-code", handelGenerateQrCode)



// Importing the router
module.exports = router
