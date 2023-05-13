const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../private/secretKey')

function createToken(payload) {
    return jwt.sign(payload, jwtSecretKey);
}

function getUser(token) {
    return jwt.verify(token, jwtSecretKey);
}


module.exports = {
    createToken,
    getUser
}