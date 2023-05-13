const { getUser } = require('../services/auth')

const checkLogin = (req, res, next) => {

    if (!req.cookies.token) {
        req.user = null;
        req.isLogin = false;
        next();
        return;
    }

    try {
        req.user = getUser(req.cookies.token);
        req.isLogin = true;
    } catch (error) {
        req.user = null;
        req.isLogin = false;
    }

    next();
    return;
}

module.exports = {
    checkLogin
}
