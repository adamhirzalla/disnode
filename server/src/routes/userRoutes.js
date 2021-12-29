// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../db/queries/users");
const createError = require("http-errors");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middleware/auth");

// Test route
router.get("/", verifyAccessToken, (req, res, next) => {
  console.log(req.headers["authorization"]);
  res.send("11");
  // Users.test().then(result => res.json(result));
});

// Register a new user
router.post("/register", (req, res, next) => {
  const { full_name, display_name, username, email, password } = req.body;
  if (!full_name || !email || !password) {
    return next(createError(400, "full name, email and password are required"));
  }
  // Hash password
  bcrypt
    .hash(password, 10)
    .then(hash => {
      return Users.register({
        full_name,
        display_name,
        username,
        email,
        hash,
      });
    })
    .then(result => {
      if (!result.length) {
        return next(
          createError(500, "Unexpected error occured - failed to create user")
        );
      }
      // User register successfully, set JWT and send
      const accessToken = generateAccessToken(result[0].username);
      const refreshToken = generateRefreshToken(result[0].username);
      const fullName = result[0].full_name;
      const displayName = result[0].display_name;
      res.json({
        accessToken,
        refreshToken,
        fullName,
        displayName,
      });
    })
    .catch(err => {
      if (err.code === "23505") {
        return next(createError(400, "User with this email already exists"));
      }
    });
});

// Log a user in
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(createError(400, "email, password are required"));
  }

  Users.findUserByUsername(username)
    .then(result => {
      if (!result) {
        return Promise.reject(createError(401, "Invaild username or password"));
      }

      // If user exist, verify password
      return Promise.all([
        bcrypt.compare(password, result.password),
        Promise.resolve(result),
      ]);
    })
    .then(([validate, result]) => {
      if (!validate)
        return next(createError(401, "Invaild username or password"));

      // Valid login - set JWT and send
      const token = generateAccessToken(result.username);
      const refreshToken = generateRefreshToken(result.username);
      const fullName = result.full_name;
      const displayName = result.display_name;
      const avatar = result.avatar || "";
      res.status(200).send({
        token,
        refreshToken,
        fullName,
        displayName,
        avatar,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
