const db = require("../index");

// TODO: add type as parameter (img/text/code)
const create = (data) => {
  // const { senderId, body, channelId, dmId } = data;
  ////////////////////////
  // const query = `
  // INSERT INTO channels
  // (server_id, title, creator_id)
  // VALUES ($1, $2, $3)
  // RETURNING *;
  // `;
  // const params = [serverId, userId, title];
  // return db.query(query, params).then((res) => res.rows[0]);
};

const byChannel = (channelId) => {
  const query = `
  SELECT 
    messages.id,
    users.nickname AS sender_nickname,
    users.avatar AS sender_avatar,
    messages.sender_id,
    body,
    type,
    sent_at
  FROM messages
  JOIN channels ON channel_id = channels.id
  JOIN users ON sender_id = users.id
  WHERE channel_id = $1
  `;
  const params = [channelId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = {
  create,
  byChannel,
};
