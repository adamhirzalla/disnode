const db = require("../index");

const byServer = (serverId) => {
  const query = `
  SELECT 
    members.id,
    users.id AS user_id,
    users.display_name AS nickname,
    members.role,
    users.avatar,
    users.is_active
  FROM members
  JOIN users ON users.id = user_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  `;
  const params = [serverId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = {
  byServer,
};
