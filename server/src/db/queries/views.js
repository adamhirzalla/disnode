const db = require("../index");

const byMessage = (message, userId) => {
  const query = `
  SELECT 
    message_id,
    user_id AS viewer_id,
    users.nickname AS viewer_nickname,
    users.avatar AS viewer_avatar,
    users.is_active,
    viewed_at
  FROM views
  JOIN users ON users.id = user_id
  WHERE message_id = $1;
  `;
  const params = [message.id];
  if (message.sender_id != userId) add(message, userId);
  return db.query(query, params).then((res) => res.rows);
};

const add = (message, userId) => {
  const query = `
  INSERT INTO views (message_id, user_id)
  VALUES ($1, $2) 
  ON CONFLICT (message_id, user_id) 
  DO NOTHING;
  `;
  const params = [message.id, userId];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = {
  byMessage,
};
