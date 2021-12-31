const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Try to verify/decode the JWT, and append to res.locals if successful
    // TODO: change headers to use custom header + get rid of having to split
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized: No Token Provided");
    req.user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized: Invalid Token");
  }
};

// middleware for verify Refresh Token
const authRef = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized: No Token Provided");
  try {
    req.user = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized: Invalid Token");
  }
};

module.exports = { auth, authRef };
