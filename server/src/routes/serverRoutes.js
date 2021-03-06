const router = require("express").Router();
const Server = require("../db/queries/servers");
const Channel = require("../db/queries/channels");
const Member = require("../db/queries/members");
const Helpers = require("../helpers/dbHelpers");
const Tag = require("../db/queries/tags");
const uuid = require("uuid");

// GET All user servers
router.get("/servers", async (req, res) => {
  const userId = req.user.id;
  const { title, invite_code, tags } = req.query;
  try {
    if (title) {
      // querying by title
      const servers = await Server.byTitle(title);
      if (!servers) return res.status(400).send("No servers found");
      return res.status(200).send(servers);
    } else if (invite_code) {
      // querying by invite_code
      const server = await Server.byCode(invite_code);
      if (!server) return res.status(400).send("Invalid invite code!");
      return res.status(200).send(server);
    }
    if (tags) {
      // querying by tags
      const parsedTags = tags.map((t) => parseInt(t));
      const servers = await Server.byTags(parsedTags);
      return res.status(200).send(servers);
    }
    // no query, return servers joined by user
    const servers = await Server.byUser(userId);
    if (!servers) return res.status(400).send("No servers joined");
    res.status(200).send(servers);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/servers/all", async (req, res) => {
  try {
    const servers = await Server.all();
    res.status(200).send(servers);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// create a new server
router.post("/servers", async (req, res) => {
  const creatorId = req.user.id;
  const { title, logo } = req.body;
  const invite_code = uuid.v4();
  if (!title) return res.status(400).send("Server title is required");
  try {
    const server = await Server.create({
      creatorId,
      title,
      logo,
      invite_code,
    });
    await Member.create({
      serverId: server.id,
      userId: server.creator_id,
      role: "owner",
    });
    await Channel.create({
      serverId: server.id,
      userId: server.creator_id,
      title: "general",
    });
    res.status(200).send(server);
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
    if (!server) return res.status(400).send("Server not found");
    const channels = Helpers.parseChannels(server.channels);
    res.status(200).send({ ...server, channels });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// update server
router.put("/servers/:serverId", async (req, res) => {
  const serverId = req.params.serverId;
  const { data } = req.body;
  try {
    await Tag.addMultiple(serverId, data.tags);
    const server = await Server.update(data, serverId);
    res.status(200).send(server);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// getting all current server channels
router.get("/servers/:id/channels", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;

  try {
    // some test servers have no channels created (prior to default 'general' creation)
    // if (!channels)return res.status(400).send('No channels found');
    const servers = await Server.byUser(userId);
    const server = servers.filter((server) => server.id === parseInt(serverId));
    if (!server.length)
      return res.status(401).send("User is not a member of this server");
    const channels = await Channel.byServer(serverId, userId);
    res.status(200).json(channels);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// creating a new channel
router.post("/servers/:id/channels", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;
  const { title } = req.body;
  if (!title) return res.status(400).send("Channel title is required");
  try {
    const channel = await Channel.create({ serverId, userId, title });
    res.status(200).json(channel);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// removing a member from server
router.delete("/servers/:serverId/members/:memberId", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const { serverId, memberId } = req.params;
  try {
    const requester = await Member.inServerByUser(userId, serverId);
    const member = await Member.byID(memberId);
    // member -> being deleted, requester -> requesting the delete action

    // if either the requester or the member do not exist in the server, return
    if (!requester || !member)
      return res.status(400).send("User is not a member of the server");
    if (
      member.user_id != userId &&
      requester.role !== "owner" &&
      requester.role !== "admin"
    ) {
      return res.status(400).send("User does not have permission");
    }
    await Member.remove(memberId);
    const members = await Member.byServer(serverId);
    res.status(200).json(members);
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

// adding tags to a server
router.post("/servers/:id/tags", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;
  const { tags } = req.body;
  if (!tags.length)
    return res.status(400).send("At least 1 server tag is required");
  try {
    await Server.createTags(tags, serverId);
    res.status(200).send("Tags added successfully");
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// updating member's role in a server
router.put("/servers/:serverId/members/:memberId", async (req, res) => {
  const { serverId, memberId } = req.params;
  const { role } = req.body;
  await Member.updateRole(role, memberId);
  const members = await Member.byServer(serverId);
  res.status(200).send(members);
});

router.get("/servers/:id/members", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;

  try {
    // some test servers have no channels created (prior to default 'general' creation)
    // if (!channels)return res.status(400).send('No channels found');
    const members = await Member.byServer(serverId);

    res.status(200).json(members);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// add a member into server
router.post("/servers/:serverId/members", async (req, res) => {
  const userId = req.user.id;
  const { serverId } = req.params;
  const data = { serverId, userId, role: "user" };
  try {
    await Member.create(data);
    const members = await Member.byServer(serverId);
    res.status(200).json(members);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
