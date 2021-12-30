const db = require("../index");

const test = () => {
  return db
    .query(
      `
  SELECT *
  FROM users;
  `
    )
    .then((res) => res.rows);
};

const register = (data) => {
  const { full_name, display_name, username, email, password } = data;

  const query = `
  INSERT INTO users 
  (full_name, display_name, username, email, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  const params = [full_name, display_name, username, email, password];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byUsername = (username) => {
  const query = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const params = [username];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byId = (id) => {
  const query = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const params = [id];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = { test, register, byUsername, byId };
