const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecretKey = process.env.JWT_PRIVATE_KEY;

function createToken(payload) {
  return jwt.sign(payload, jwtSecretKey);
}

function getUser(token) {
  return jwt.verify(token, jwtSecretKey);
}

module.exports = {
  createToken,
  getUser,
};
