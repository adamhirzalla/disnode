const db = require("../index");
const User = require("./users");

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

const add = (userId, senderId) => {
  const query = `
  INSERT INTO friends (user1_id, user2_id)
  VALUES ($1, $2)
  ON CONFLICT (user1_id, user2_id)
  DO NOTHING
  RETURNING *
  `;
  const params = [userId, senderId];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = { byUser, add };
