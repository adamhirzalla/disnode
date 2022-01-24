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

const add = (serverId, tagId) => {
  const query = `
  INSERT INTO server_tags (server_id, tag_id)
  VALUES ($1, $2)
  RETURNING *
  `;
  const params = [serverId, tagId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const remove = (serverId) => {
  const query = `
  DELETE FROM server_tags
  WHERE server_id = $1
  RETURNING *
  `;
  const params = [serverId];
  return db.query(query, params).then((res) => res.rows);
};

const addMultiple = async (serverId, tagsId) => {
  await remove(serverId);
  const queries = tagsId.map((tagId) => {
    add(serverId, tagId).then((res) => res.rows);
  });
  return Promise.all(queries);
};

module.exports = {
  byServer,
  addMultiple,
};
