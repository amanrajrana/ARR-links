const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const { handelGetAnalytics } = require("./controllers/url");
const { handelRedirect } = require("./controllers/redirect");
const { checkLogin } = require("./middlewares/checkLogin");
require("dotenv").config({ path: ".env.local" });

/** Import Routers */
const apiRouter = require("./routes/apiRouter");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined in .env

// connect mongoDB to localhost
const uri = process.env.DB_URI || console.log(`mongodb uri not found`);

mongoose
  .connect(uri)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("unable to connect mongodb", err));

//PUG SPECIFIC CONFIGURATION
app.set("view-engine", "pug"); //set view engine as PUG
app.set("views", path.join(__dirname, "views")); //join view

//EXPRESS SPECIFIC CONFIGURATION
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/static", express.static("static")); //for serving static file
app.use("/public", express.static(__dirname + "/static"));
app.use(
  "/fontawesome",
  express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free")
);

// APPLICATION LEVEL MIDDLEWARE
app.use(checkLogin);

// ROUTERS
app.use("/api", apiRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.get("/s/:shortId", handelRedirect);
app.get("/analytics/:shortId", handelGetAnalytics);

//this api display all the shorted url
app.get("/aman", async (req, res) => {
  const allUrl = await URL.find({});
  const domain = `http://localhost:3000/s/`;
  res.render("url.pug", { allUrl, domain });
});

app.get("*", (req, res) => {
  res.status(404).render("404.pug");
});

app.listen(PORT, () =>
  console.log(`App is running on port ${PORT}`)
);
