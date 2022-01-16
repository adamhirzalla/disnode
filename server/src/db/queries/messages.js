const db = require("../index");

const byChannel = (channelId) => {
  const query = `
  SELECT 
    messages.id,
    messages.sender_id,
    body,
    sent_at
  FROM messages
  JOIN channels ON channel_id = channels.id
  JOIN users ON sender_id = users.id
  WHERE channel_id = $1
  `;
  const params = [channelId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = { byChannel };
