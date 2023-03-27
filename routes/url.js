const express = require('express');
const { handelGenerateNewShortUrl } = require('../controllers/url');

const router = express.Router();

router.post("/", handelGenerateNewShortUrl);

module.exports = router;