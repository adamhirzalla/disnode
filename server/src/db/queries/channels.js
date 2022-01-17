const db = require("../index");

const create = (data) => {
  const { serverId, userId, title } = data;

  const query = `
  INSERT INTO channels 
  (server_id, title, creator_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const params = [serverId, title, userId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byServer = (serverId) => {
  const query = `
  SELECT 
    channels.id,
    channels.title,
    channels.creator_id
  FROM channels
  JOIN users ON users.id = creator_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  `;
  const params = [serverId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = {
  byServer,
  create,
};
