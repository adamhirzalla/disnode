const router = require("express").Router();
const Message = require("../db/queries/messages");

// sending a new channel message
router.post("/channels/:id/messages", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const senderId = req.user.id;
  const channelId = req.params.id;
  const { body } = req.body;
  try {
    const message = await Message.createInChannel({
      senderId,
      channelId,
      body,
    });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
