const db = require("../index");
const Social = require("./socials");

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

// need: friends
// dms
// requests (friends)

const byID = (userId) => {
  const userQuery = db
    .query(
      `
  SELECT *
  FROM users
  WHERE id = $1
  `,
      [userId]
    )
    .then((res) => res.rows[0]);

  return Promise.all([userQuery, Social.byUser(userId)]).then(
    ([user, socials]) => {
      delete user.password;
      delete user.email;
      delete user.username;
      delete user.created_at;
      return { ...user, socials };
    }
  );
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

const update = (id, profile) => {
  const { full_name, bio, avatar, nickname } = profile;
  const query = `
  UPDATE users
  SET full_name = $1,
  bio = $2,
  avatar = $3,
  nickname = $4
  WHERE id = $5
  RETURNING *
  `;
  const params = [full_name, bio, avatar, nickname, id];
  return db.query(query, params).then((res) => {
    const user = res.rows[0];
    delete user.password;
    delete user.email;
    delete user.username;
    delete user.created_at;
    return { ...user };
  });
};

module.exports = {
  all,
  create,
  byUsername,
  byID,
  setActive,
  setInactive,
  update,
};
