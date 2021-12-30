const jwt = require("jsonwebtoken");

const accessKey = process.env.JWT_ACCESS_KEY;
const refreshKey = process.env.JWT_REFRESH_KEY;

const generateAccess = (id) => {
  return jwt.sign({ id }, accessKey, {
    expiresIn: "30m",
  });
};

const generateRefresh = (id) => {
  return jwt.sign({ id }, refreshKey, {
    expiresIn: "1d",
  });
};

module.exports = { generateAccess, generateRefresh };
