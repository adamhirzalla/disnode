const db = require("../index");
const Message = require("./messages");
const Channel = require("./channels");
const Member = require("./members");
const Tag = require("./tags");

const create = (data) => {
  const { creatorId, title, image, invite_code } = data;

  const query = `
  INSERT INTO servers 
  (creator_id, title, image, invite_code)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  const params = [creatorId, title, image, invite_code];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byUser = (userId) => {
  const query = `
  SELECT servers.id, 
    servers.title, 
    servers.image AS logo
  FROM servers
  JOIN members ON server_id = servers.id
  JOIN users ON user_id = users.id
  WHERE user_id = $1
  `;
  const params = [userId];
  return db.query(query, params).then((res) => res.rows);
};

const byID = (serverId) => {
  const serverQuery = db
    .query(
      `
  SELECT 
    id,
    title,
    image AS logo,
    creator_id AS owner_id,
    invite_code
  FROM servers
  WHERE id = $1
  `,
      [serverId]
    )
    .then((res) => res.rows[0]);

  return Promise.all([
    serverQuery,
    Member.byServer(serverId),
    Tag.byServer(serverId),
    Channel.byServer(serverId),
  ])
    .then(([server, members, tags, channels]) => {
      return { ...server, members, tags, channels };
    })
    .then((serverData) => {
      const messageQueries = serverData.channels.map((channel) =>
        Message.byChannel(channel.id)
      );
      return Promise.all(messageQueries).then((messages) => {
        serverData.channels.forEach((channel, i) => {
          channel.messages = messages[i];
        });
        return serverData;
      });
    });
};

module.exports = {
  byUser,
  byID,
  create,
};
