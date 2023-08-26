const URL = require("../../models/url");

const handelRedirect = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        clickInfo: {
          clickTime: Date.now(),
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          referrer: req.headers.referer,
        },
      },
    }
  );

  let redirectURL = entry.redirectURL;

  if (redirectURL.startsWith("http://") || redirectURL.startsWith("https://")) {
  } else {
    redirectURL = `//${redirectURL}`;
  }

  res.redirect(redirectURL);
};

module.exports = { handelRedirect };
