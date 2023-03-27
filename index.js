const express = require('express');
const mongoose = require('mongoose');
const urlRoute = require('./routes/url');
const path = require('path');

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
app.use('/url', urlRoute);

app.get("/", (req, res) => {
    res.render('pages/home/home.pug')
});

app.get("/url-analytics", (req, res) => {
    res.render('pages/url-analytics/url-analytics.pug')
});

app.get("/sign-in", (req, res) => {
    res.render('pages/sign-in/sign-in.pug')
});







app.listen(PORT, () => console.log(`App is running on port ${PORT}`));