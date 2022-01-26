const router = require("express").Router();
const Friend = require("../db/queries/friends");
const Request = require("../db/queries/requests");

// accept friend request
router.post("/friends", async (req, res) => {
  const userId = req.user.id;
  const { requestId } = req.body;
  try {
    const request = await Request.remove(requestId);
    await Friend.add(request.sender_id, userId);
    const friends = await Friend.byUser(userId);
    res.status(200).send({ friends, request });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});
// // accept friend request
// router.post("/friends/:id", async (req, res) => {
//   const userId = req.user.id;
//   const senderId = req.params.id;
//   try {
//     await Request.remove(userId, senderId);
//     const accepted = await Friend.add(userId, senderId);
//     const friends = await Friend.byUser(userId);
//     res.status(200).send({ friends, accepted });
//   } catch (e) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// create a friend request
router.post("/requests", async (req, res) => {
  const userId = req.user.id;
  const { receiverId } = req.body;
  console.log(userId, receiverId);
  try {
    // const test = await Request.send(userId, receiverId);
    // const sent = await Request.sent(userId);
    const request = await Request.add(receiverId, userId);
    console.log(request);
    const requests = await Request.byUser(userId);
    console.log(requests);
    res.status(200).send(requests);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// reject friend request / cancel friend request
router.delete("/requests/:id", async (req, res) => {
  const requestId = req.params.id;
  try {
    const request = await Request.remove(requestId);
    res.status(200).send({ request });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
