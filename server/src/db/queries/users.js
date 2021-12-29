const db = require("../index");

const test = () => {
  return db
    .query(
      `
  SELECT *
  FROM users;
  `
    )
    .then(res => res.rows);
};

const register = user => {
  const { full_name, display_name, username, email, hash } = user;

  return db
    .query(
      `
  INSERT INTO users 
  (full_name, display_name, username, email, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING username, full_name, display_name;
  `,
      [full_name, display_name, username, email, hash]
    )
    .then(res => res.rows);
};

const findUserByUsername = username => {
  return db
    .query(
      `
  SELECT *
  FROM users
  WHERE username = $1
  `,
      [username]
    )
    .then(res => res.rows[0]);
};

module.exports = { test, register, findUserByUsername };
