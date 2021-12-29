require("dotenv").config();

const router = require("express").Router();
const bcrypt = require("bcrypt");
const { promise } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");
const Users = require("../db/queries/users");

// Generate Token
const generateAccessToken = username => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

// Generate Refresh Token
const generateRefreshToken = username => {
  return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};

// Test route
router.get("/", (req, res) => {
  Users.test().then(result => res.json(result));
});

// Register a new user
router.post("/register", (req, res, next) => {
  const { full_name, display_name, username, email, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).send("full name, email and password are required");
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
        next({
          status: 500,
          message: "Unexpected error occured - failed to create user",
        });
      }
      // User register successfully, set JWT and send
      const accessToken = generateRefreshToken(result[0].username);
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
        return next({
          status: 400,
          message: "User with this email already exists",
        });
      }
    });
});

// Log a user in
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({ status: 400, message: "email, password are required" });
  }

  Users.findUserByUsername(username)
    .then(result => {
      if (!result) {
        return Promise.reject({
          status: 400,
          message: "username does not exist",
        });
      }

      // If user exist, verify password
      return Promise.all([
        bcrypt.compare(password, result.password),
        Promise.resolve(result),
      ]);
    })
    .then(([validate, result]) => {
      if (!validate) next({ status: 400, message: "Invaild password" });

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
