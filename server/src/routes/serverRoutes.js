const router = require("express").Router();
const Server = require("../db/queries/servers");
const Channel = require("../db/queries/channels");

// All user servers
router.post("/servers", async (req, res) => {
  const userId = req.user.id;
  try {
    const servers = await Server.byUser(userId);
    res.status(200).send(servers);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// Single server data
router.post("/servers/:id", async (req, res) => {
  const userId = req.user.id;
  const serverId = req.params.id;
  try {
    const server = await Server.byID(serverId, userId);
    res.status(200).json(server);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/servers/:serverId/channels", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;
  const { title } = req.body;

  try {
    const channel = await Channel.create({ serverId, userId, title });
    res.status(200).json(channel);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
