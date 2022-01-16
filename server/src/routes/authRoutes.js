const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../db/queries/users");
const { authRef } = require("../middleware/auth");
const {
  generateAccess,
  generateRefresh,
  validateLogin,
  validateRegister,
} = require("../helpers/authHelpers");

// Register a new user
router.post("/register", async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { full_name, display_name, username, email, password } = req.body;
  try {
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    await Users.register({
      full_name,
      display_name,
      username,
      email,
      password: hash,
    });
    return res
      .status(200)
      .send("Registration successful. Please proceed to login");
    // User register successfully, set JWT and send
    // const accessToken = generateAccess(user.id);
    // const refreshToken = generateRefresh(user.id);

    // res.json({
    //   tokens: { accessToken, refreshToken },
    //   user: { ...user, password: "" },
    // });
  } catch (e) {
    if (e.code === "23505") {
      return res.status(400).send("Bad Request: Username/email already exists");
    }
    return res.status(500).send("Internal Server Error");
  }
});

// Log a user in
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { username, password } = req.body;
  try {
    const user = await Users.byUsername(username);
    if (!user) {
      return res.status(400).send("Bad Request: Username does not exist");
    }
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(401).send("Unauthorized: Invalid username or password");
    }
    // Valid login - set JWT and send
    const accessToken = generateAccess(user.id);
    const refreshToken = generateRefresh(user.id);
    res.status(200).send({
      tokens: { accessToken, refreshToken },
    });
  } catch (e) {
    res.status(500).send("Internal Server Error: Failed to Login");
  }
});

// Refresh Token
router.get("/token", authRef, (req, res) => {
  const id = req.user.id;
  const accessToken = generateAccess(id);
  const refreshToken = generateRefresh(id);
  res.send({ accessToken, refreshToken });
});

module.exports = router;
