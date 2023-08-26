const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const { handelGetAnalytics } = require("./controllers/url");
const { checkLogin } = require("./middlewares/checkLogin");
const { connectDB } = require("./dbConnect");
const { checkEnv4Development, checkEnv4Production } = require("./checkEnvVar");
require("dotenv").config({ path: ".env.local" });

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const checkRequiredEnv = () => {
  if (!NODE_ENV) {
    console.error("NODE_ENV not found");
    process.exit(1);
  }

  console.log(`App is running in ${NODE_ENV} mode`);
  if (NODE_ENV === "production") {
    checkEnv4Production(); // Check for required env variables for production
  } else {
    checkEnv4Development(); // Check for required env variables for development
  }
};

checkRequiredEnv();

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
app.use("/api", require("./routes/apiRouter"));
app.use("/user", require("./routes/user"));
app.use("/", require("./routes/staticRouter"));

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

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("app is started PORT@", PORT);
    });
  })
  .catch((error) => {
    console.log("Unable to start app index.js ", error);
    process.exit(1);
  });
