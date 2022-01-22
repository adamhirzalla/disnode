// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const { auth } = require("../middleware/auth");
const User = require("../db/queries/users");
const Icon = require("../db/queries/icons");
const Social = require("../db/queries/socials");

// Testing token
router.get("/me", async (req, res) => {
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
router.get("/users/:id", async (req, res) => {
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

// should probably be /api/users/:id to follow RESTful API
// using jwt to get userID instead
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { data } = req.body;
  try {
    await User.update(data, userId);
    await Social.addMultiple(userId, data.socials);
    const user = await User.byID(userId);

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
