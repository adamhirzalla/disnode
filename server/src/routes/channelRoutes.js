const router = require("express").Router();
const Message = require("../db/queries/messages");
const Channel = require("../db/queries/channels");

// -> Changed to GET /api/servers/:id/channels
// getting all current server channels
// router.post("/channels", async (req, res) => {
//   const userId = req.user.id;
//   const { serverId } = req.body;
//   try {
//     const channels = await Channel.byServer(serverId);
//     // some test servers have no channels created (prior to default 'general' creation)
//     // if (!channels)return res.status(400).send('No channels found');
//     res.status(200).json(channels);
//   } catch (e) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// getting all server messages
// router.get("/channels/:id/messages", async (req, res) => {
//   // for: error validation
//   // const { error } = validateChannel(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);
//   const senderId = req.user.id;
//   const channelId = req.params.id;
//   const { body } = req.body;
//   if (!body.trim()) return res.status(400).send("Cannot send an empty message");
//   try {
//     const message = await Message.sendToChannel({
//       senderId,
//       channelId,
//       body,
//     });
//     const messages = Message.byChannel;
//     res.status(200).json(message);
//   } catch (e) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// edit a channel title
router.put("/channels/:channelId", async (req, res) => {
  const { channelId } = req.params;
  const { input } = req.body;
  try {
    const channel = await Channel.edit(input, channelId);
    // const channels = await Channel.byServer(serverId);
    res.status(200).json(channel);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// remove a channel from server
router.delete("/channels/:channelId", async (req, res) => {
  const { channelId } = req.params;
  try {
    const channel = await Channel.remove(channelId);
    // const channels = await Channel.byServer(serverId);
    res.status(200).json(channel);
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
    const message = await Message.sendToChannel({
      senderId,
      channelId,
      body,
    });
    const messages = Message.byChannel;
    res.status(200).json(message);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// delete a message
router.delete("/channels/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  try {
    const message = await Message.remove(messageId);
    res.status(200).send(message);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
