const db = require("../index");

const all = () => {
  const query = `
  SELECT *
  FROM icons
  `;
  return db.query(query).then((res) => res.rows);
};

module.exports = { all };
