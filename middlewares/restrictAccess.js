const restrictAccessUser = (req, res, next) => {
    if(req.isLogin) {
        next();
    }

    else {
        res.render('pages/sign-in.pug');
        return;
    }
}


module.exports = {
    restrictAccessUser
}