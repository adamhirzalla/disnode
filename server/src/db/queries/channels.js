const db = require("../index");
const Message = require("./messages");

const create = (data) => {
  const { serverId, userId, title } = data;

  const query = `
  INSERT INTO channels 
  (server_id, title, creator_id)
  VALUES ($1, LOWER($2), $3)
  RETURNING *;
  `;
  const params = [serverId, title, userId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byServer = (serverId, userId) => {
  const query = `
  SELECT 
    channels.id,
    channels.title,
    channels.creator_id
  FROM channels
  JOIN users ON users.id = creator_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  ORDER BY channels.id
  `;
  const params = [serverId];
  return db
    .query(query, params)
    .then((res) => res.rows)
    .then((channels) => {
      const messageQueries = channels.map((channel) =>
        Message.byChannel(channel.id, userId)
      );
      return Promise.all(messageQueries).then((messages) => {
        channels.forEach((channel, i) => {
          channel.messages = messages[i];
        });
        return channels;
      });
    });
};

const edit = (input, channelId) => {
  const query = `
  UPDATE channels
  SET title = $1
  WHERE id = $2
  RETURNING * 
  `;
  const params = [input, channelId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const remove = (channelId) => {
  const query = `
  DELETE FROM channels
  WHERE id = $1
  RETURNING *
  `;
  const params = [channelId];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = {
  byServer,
  create,
  edit,
  remove,
};
