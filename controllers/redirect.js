const URL = require("../models/url");

const handelRedirect = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );

    let redirectURL = entry.redirectURL;

    if(redirectURL.startsWith('http://') || redirectURL.startsWith('https://')) { }
    else redirectURL = `//${redirectURL}`
    
    res.redirect(redirectURL);
}


module.exports = { handelRedirect }