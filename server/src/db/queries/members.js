const db = require("../index");

const byChannel = (channelId) => {
  const query = `
  SELECT 
    members.id AS member_id,
    users.id AS user_id,
    users.nickname,
    members.role,
    users.avatar,
    users.is_active
  FROM members
  JOIN users ON users.id = user_id
  JOIN channels ON channels.id = channel_id
  WHERE channel_id = $1
  `;
  const params = [channelId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = {
  byChannel,
};
