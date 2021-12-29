const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  // Generate Token
  generateAccessToken: (username, next) => {
    return JWT.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
  },

  // Generate Refresh Token
  generateRefreshToken: (username, next) => {
    return JWT.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "5d",
    });
  },

  // Verify Access Token
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.user = user;
      next();
    });
  },
};
