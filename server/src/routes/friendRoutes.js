const router = require("express").Router();
const Friend = require("../db/queries/friends");
const Request = require("../db/queries/requests");

// get all friends of a user
router.get("/friends", async (req, res) => {
  const userId = req.user.id;
  try {
    const friends = await Friend.byUser(userId);
    res.status(200).send(friends);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// accept friend request
router.put("/friends/:id", async (req, res) => {
  const userId = req.user.id;
  const senderId = req.params.id;
  try {
    await Request.response(userId, senderId);
    const accepted = await Friend.add(userId, senderId);
    const friends = await Friend.byUser(userId);
    res.status(200).send({ friends, accepted });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// get all requests (recived/sent)
router.get("/requests", async (req, res) => {
  const userId = req.user.id;
  try {
    const received = await Request.received(userId);
    const sent = await Request.sent(userId);
    const requests = { received, sent };
    res.status(200).send(requests);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// reject friend request
router.put("/requests/:id", async (req, res) => {
  const userId = req.user.id;
  const senderId = req.params.id;
  try {
    const rejected = await Request.response(userId, senderId);
    res.status(200).send(rejected);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
