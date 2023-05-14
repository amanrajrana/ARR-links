const express = require('express');
const router = express.Router();
const { handelSignUp, handelLogIn, handelUserSignUpOtpVerify, handelLogOut, handleForgotPassword, handelUpdatePassword } = require('../controllers/user');
const { restrictAccessUser } = require('../middlewares/restrictAccess')

router.post("/sign-up", handelSignUp);
router.post("/sign-in", handelLogIn);
router.get('/log-out', handelLogOut);
router.post("/verify-otp", handelUserSignUpOtpVerify);
router.post("/forgot-password", handleForgotPassword);
router.post("/update-password", handelUpdatePassword);


// Following router only can access if user is login
router.use(restrictAccessUser)

router.get("/", (req, res) => {
    const params = {
        isLogin: req.isLogin,
        user: req.user
    }
    res.render('pages/userAccount/dashboard.pug', params)
});

router.get("/urls", (req, res) => {
    res.render('pages/userAccount/urls.pug')
});

router.get("/create", (req, res) => {
    res.render('pages/userAccount/create.pug')
});

router.get("/order", (req, res) => {
    res.render('pages/userAccount/order.pug')
});

router.get("/notifications", (req, res) => {
    res.render('pages/userAccount/notifications.pug')
});

router.get("/profile", (req, res) => {
    res.render('pages/userAccount/profile.pug')
});


module.exports = router;