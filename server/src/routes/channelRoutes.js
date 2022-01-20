const router = require("express").Router();
const Message = require("../db/queries/messages");
const Channel = require("../db/queries/channels");

// getting all current server channels
router.post("/channels", async (req, res) => {
  const userId = req.user.id;
  const { serverId } = req.body;
  try {
    const channels = await Channel.byServer(serverId);
    // some test servers have no channels created (prior to default 'general' creation)
    // if (!channels)return res.status(400).send('No channels found');
    res.status(200).json(channels);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// sending a new channel message
router.post("/channels/:id/messages", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const senderId = req.user.id;
  const channelId = req.params.id;
  const { body } = req.body;
  if (!body.trim()) return res.status(400).send("Cannot send an empty message");
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
