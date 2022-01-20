const db = require("../index");

const all = () => {
  const query = `SELECT * FROM users;`;
  return db.query(query).then((res) => res.rows);
};

const create = (data) => {
  const { full_name, nickname, username, email, password } = data;

  const query = `
  INSERT INTO users 
  (full_name, nickname, username, email, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  const params = [full_name, nickname, username, email, password];
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

const byID = (id) => {
  const query = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const params = [id];
  return db.query(query, params).then((res) => res.rows[0]);
};

const setActive = (id) => {
  const query = `
  UPDATE users 
  SET is_active = 'true'
  WHERE id = $1
  RETURNING *
  `;
  const params = [id];
  return db.query(query, params).then((res) => res.rows[0]);
};

const setInactive = (id) => {
  const query = `
  UPDATE users 
  SET is_active = 'false'
  WHERE id = $1
  RETURNING *
  `;
  const params = [id];
  return db.query(query, params).then((res) => res.rows[0]);
};

module.exports = { all, create, byUsername, byID, setActive, setInactive };
