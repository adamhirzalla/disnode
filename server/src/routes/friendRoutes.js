const router = require("express").Router();
const Friend = require("../db/queries/friends");

// get all friends of a user
router.get("/users/friends", async (req, res) => {
  const userId = req.user.id;
  try {
    const friends = await Friend.byUser(userId);
    res.status(200).send(friends);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
