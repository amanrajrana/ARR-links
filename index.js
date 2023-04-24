const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const URL = require('./models/url');
const { handelGenerateNewShortUrl, handelGetAnalytics } = require('./controllers/url');
const { handelRedirect } = require('./controllers/redirect');
const router = require('./routes/staticRouter');

const app = express();
const PORT = 3000;

//EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'));  //for serving static file

//PUG SPECIFIC CONFIGURATION
app.set('view-engine', 'pug');  //set view engine as PUG
app.set('views', path.join(__dirname, 'views')); //join view

// connect mongoDB to localhost
mongoose.connect('mongodb://127.0.0.1:27017/link-shortener')
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("unable to connect mongodb", err));

app.use(express.json());
// app.use('/', staticRouter)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use("/short-url/", routerShortUrl)


app.get('/s/:shortId', handelRedirect);


app.get("/analytics/:shortId", handelGetAnalytics)

app.get("/", (req, res) => {
    res.render('pages/home/home.pug')
});


app.post('/api/short-url', handelGenerateNewShortUrl)

app.get("/url-analytics", (req, res) => {
    res.render('pages/url-analytics/url-analytics.pug')
});

app.get("/sign-in", (req, res) => {
    res.render('pages/sign-in/sign-in.pug')
});

//this api display all the shorted url 
app.get("/aman", async (req, res) => {
    const allUrl = await URL.find({});
    const domain = `http://localhost:3000/s/`;
    // console.log(allUrl)
    res.render('url.pug', { allUrl, domain })
})




app.listen(PORT, () => console.log(`App is running on port http://127.0.01:${PORT}`));