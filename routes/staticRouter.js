const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const params = {
        isLogin: req.isLogin,
        user: req.user
    }
    res.render('pages/home/home.pug', params);
});


router.get("/sign-in", (req, res) => {

    // If user is login then redirect to /user
    if(req.isLogin) {
       return res.redirect('/user');
    }

    res.render('pages/sign-in.pug');
});

router.get("/sign-up", (req, res) => {

    // If user is login then redirect to /user
    if(req.isLogin) {
       return res.redirect('/user');
    }
    res.render('pages/sign-up.pug');
});


module.exports = router;
