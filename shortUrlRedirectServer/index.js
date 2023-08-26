const express = require("express");
const { connectDB } = require("../dbConnect");
const { handelRedirect } = require("./controllers/redirect");
const app = express();
require("dotenv").config({ path: "../.env.local" });

const MONGO_URI = process.env.MONGO_URI;
const REDIRECT_SERVER_PORT = process.env.REDIRECT_SERVER_PORT;
console.log(MONGO_URI);

app.get("/:shortId", handelRedirect);

connectDB(MONGO_URI)
  .then(() =>
    app.listen(REDIRECT_SERVER_PORT, () =>
      console.log("redirect server started @", REDIRECT_SERVER_PORT)
    )
  )
  .catch((error) => {
    console.log("Unable to start server:", error);
    process.exit(1);
  });
