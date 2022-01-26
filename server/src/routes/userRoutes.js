// require('crypto').randomBytes(64).toString('hex')

const router = require("express").Router();
const { auth } = require("../middleware/auth");
const User = require("../db/queries/users");
const Icon = require("../db/queries/icons");
const Social = require("../db/queries/socials");
const Friend = require("../db/queries/friends");
const Request = require("../db/queries/requests");

// Testing token
router.get("/me", async (req, res) => {
  const userId = req.user.id;
  try {
    const me = await User.byID(userId);
    delete me.password;
    const friends = await Friend.byUser(userId);

    const requests = await Request.byUser(userId);

    // const received = await Request.received(userId);
    // const sent = await Request.sent(userId);
    res.status(200).send({ ...me, friends, requests });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// get a specific user data (NOT USED)
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

// updating/editing user
// using jwt to get userID instead
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { data } = req.body;
  try {
    await User.update(data, userId);
    await Social.addMultiple(userId, data.socials);
    const user = await User.byID(userId);
    delete user.password;
    // const friends = await Friend.byUser(userId);
    // const requests = await Request.byUser(userId);
    res.status(200).send(user);
    // const received = await Request.received(userId);
    // const sent = await Request.sent(userId);
    // const user = { ...me, friends, requests: { received, sent } };
    // res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
