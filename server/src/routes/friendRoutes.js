const router = require("express").Router();
const Friend = require("../db/queries/friends");
const Request = require("../db/queries/requests");

// accept friend request
router.post("/friends/:id", async (req, res) => {
  const userId = req.user.id;
  const senderId = req.params.id;
  try {
    await Request.remove(userId, senderId);
    const accepted = await Friend.add(userId, senderId);
    const friends = await Friend.byUser(userId);
    res.status(200).send({ friends, accepted });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// send friend request
router.post("/requests/:id", async (req, res) => {
  const userId = req.user.id;
  const receiverId = req.params.id;
  try {
    const test = await Request.send(userId, receiverId);
    const sent = await Request.sent(userId);
    res.status(200).send(sent);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// reject friend request / cancel friend request
router.delete("/requests/:requestId", async (req, res) => {
  const requestId = req.params.requestId;
  try {
    const rejected = await Request.remove(requestId);
    res.status(200).send(rejected);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
