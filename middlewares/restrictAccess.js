const restrictAccessUser = (req, res, next) => {
    if(req.isLogin) {
        next();
    }

    else {
        // res.render('pages/sign-in.pug');
        res.redirect('/sign-in');
        return;
    }
}


module.exports = {
    restrictAccessUser
}