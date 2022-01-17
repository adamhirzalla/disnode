const db = require("../index");

const byServer = (serverId) => {
  const query = `
  SELECT 
    tags.id,
    tags.name
  FROM tags
  JOIN server_tags ON tags.id = tag_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  `;
  const params = [serverId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = {
  byServer,
};
