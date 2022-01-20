const db = require("../index");

const byUser = (userId) => {
  const query = `
  SELECT 
    icons.id,
    icons.name,
    url
  FROM socials
  JOIN icons ON icons.id = icon_id
  WHERE user_id = $1
  `;
  const params = [userId];
  return db.query(query, params).then((res) => res.rows);
};

module.exports = {
  byUser,
};
