const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      require: true,
    },

    clickInfo: [
      {
        clickTime: Number,
        ipAddress: String,
        userAgent: String,
        referrer: String,
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
