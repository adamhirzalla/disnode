const db = require("../index");

const byUser = (userId) => {
  const query = `
  SELECT 
  friends.id,
  users.id as user_id,
  users.full_name,
  users.nickname,
  users.avatar,
  users.bio,
  users.is_active
  FROM friends 
  JOIN users ON user1_id = users.id 
  OR user2_id = users.id 
  WHERE user1_id = $1
  OR user2_id = $1;
  `;
  const params = [userId];
  return db
    .query(query, params)
    .then((res) => res.rows)
    .then((friends) => friends.filter((f) => f.user_id !== userId));
};

const send = (userId, memberId) => {
  const query = `
  INSERT INTO requests (sender_id, receiver_id)
  VALUES ($1, $2)
  ON CONFLICT (sender_id, receiver_id)
  DO NOTHING
  RETURNING *
  `;
  const params = [userId, memberId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const received = (userId) => {
  const query = `
  SELECT 
  requests.id,
  sender_id,
  users.full_name,
  users.nickname,
  users.avatar,
  users.bio,
  users.is_active
  FROM requests
  JOIN users ON users.id = sender_id
  WHERE receiver_id = $1
  AND pending = TRUE
  `;
  const params = [userId];
  return db.query(query, params).then((res) => res.rows);
};

const sent = (userId) => {
  const query = `
  SELECT 
  requests.id,
  receiver_id,
  users.full_name,
  users.nickname,
  users.avatar,
  users.bio,
  users.is_active
  FROM requests
  JOIN users ON users.id = receiver_id
  WHERE sender_id = $1
  AND pending = TRUE
  `;
  const params = [userId];
  return db.query(query, params).then((res) => res.rows);
};

const response = (userId, senderId) => {
  const query = `
  UPDATE requests
  SET pending = FALSE
  WHERE receiver_id = $1
  AND sender_id = $2
  RETURNING *
  `;
  const params = [userId, senderId];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = { byUser, send, received, sent, response };
