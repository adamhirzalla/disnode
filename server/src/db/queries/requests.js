const db = require("../index");

// const byUser = (userId) => {
//   const query = `
//   SELECT
//   friends.id,
//   users.id as user_id,
//   users.full_name,
//   users.nickname,
//   users.avatar,
//   users.bio,
//   users.is_active
//   FROM friends
//   JOIN users ON user1_id = users.id
//   OR user2_id = users.id
//   WHERE user1_id = $1
//   OR user2_id = $1;
//   `;
//   const params = [userId];
//   return db
//     .query(query, params)
//     .then((res) => res.rows)
//     .then((friends) => friends.filter((f) => f.user_id !== userId));
// };

const byUser = (userId) => {
  const sentQuery = db
    .query(
      `
    SELECT 
      requests.id AS request_id,
      users.id as user_id,
      users.full_name,
      users.nickname,
      users.avatar,
      users.bio,
      users.is_active
    FROM requests 
    JOIN users ON receiver_id = users.id 
    WHERE sender_id = $1;
    `,
      [userId]
    )
    .then((res) => res.rows);

  const receivedQuery = db
    .query(
      `
    SELECT 
      requests.id AS request_id,
      users.id as user_id,
      users.full_name,
      users.nickname,
      users.avatar,
      users.bio,
      users.is_active
    FROM requests 
    JOIN users ON sender_id = users.id 
    WHERE sender_id != $1
      AND receiver_id = $1;
    `,
      [userId]
    )
    .then((res) => res.rows);

  return Promise.all([sentQuery, receivedQuery]).then(([sent, received]) => {
    return { sent, received };
  });
};

// const send = (userId, receiverId) => {
//   const query = `
//   INSERT INTO requests (sender_id, receiver_id)
//   VALUES ($1, $2)
//   ON CONFLICT (sender_id, receiver_id)
//   DO NOTHING
//   RETURNING *
//   `;
//   const params = [userId, receiverId];
//   return db.query(query, params).then((res) => res.rows[0]);
// };

// const received = (userId) => {
//   const query = `
//   SELECT
//   requests.id,
//   sender_id,
//   users.full_name,
//   users.nickname,
//   users.avatar,
//   users.bio,
//   users.is_active
//   FROM requests
//   JOIN users ON users.id = sender_id
//   WHERE receiver_id = $1
//   AND pending = TRUE
//   `;
//   const params = [userId];
//   return db.query(query, params).then((res) => res.rows);
// };

// const sent = (userId) => {
//   const query = `
//   SELECT
//   requests.id,
//   receiver_id,
//   users.full_name,
//   users.nickname,
//   users.avatar,
//   users.bio,
//   users.is_active
//   FROM requests
//   JOIN users ON users.id = receiver_id
//   WHERE sender_id = $1
//   AND pending = TRUE
//   `;
//   const params = [userId];
//   return db.query(query, params).then((res) => res.rows);
// };

const add = (receiverId, senderId) => {
  console.log(receiverId, senderId);
  const query = `
  INSERT INTO requests (receiver_id, sender_id)
  VALUES ($1, $2)
  ON CONFLICT (receiver_id, sender_id)
  DO NOTHING
  RETURNING 
    id AS request_id,
    receiver_id,
    sender_id
  `;
  const params = [receiverId, senderId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const remove = (requestId) => {
  const query = `
  DELETE FROM requests
  WHERE id = $1
  RETURNING 
    id AS request_id,
    sender_id,
    receiver_id
  `;
  const params = [requestId];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = {
  byUser,
  add,
  // send,
  // received,
  // sent,
  remove,
};
