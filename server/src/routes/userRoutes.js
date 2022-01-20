// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const { auth } = require("../middleware/auth");
const User = require("../db/queries/users");

// Testing token
router.get("/me", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.byID(userId);
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// get a specific user data
router.post("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.byID(userId);
    if (!user) return res.status(400).send("User not found");
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// get all users
router.get("/users", (req, res) => {
  User.all().then((result) => res.json(result));
});
module.exports = router;
