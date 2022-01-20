const db = require("../index");
const Social = require("./socials");

const create = (data) => {
  const { serverId, userId, role } = data;

  const query = `
  INSERT INTO members 
  (server_id, user_id, role)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const params = [serverId, userId, role];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byID = (memberId) => {
  const query = `
  SELECT * FROM members
  WHERE id = $1
  `;
  const params = [memberId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const inServerByUser = (userId, serverId) => {
  const query = `
  SELECT * FROM members
  WHERE user_id = $1 AND server_id = $2
  `;
  const params = [userId, serverId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byServer = (serverId) => {
  const query = `
  SELECT 
    members.id,
    users.id AS user_id,
    users.nickname,
    members.role,
    users.avatar,
    users.bio,
    users.is_active
  FROM members
  JOIN users ON users.id = user_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  `;
  const params = [serverId];
  return db
    .query(query, params)
    .then((res) => res.rows)
    .then((members) => {
      const socialsQueries = members.map((member) =>
        Social.byUser(member.user_id)
      );
      return Promise.all(socialsQueries).then((socials) => {
        members.forEach((member, i) => {
          member.socials = socials[i];
        });
        return members;
      });
    });
};

// NOT IMPLEMENTED YET
const byDM = (serverId) => {
  const query = `
  SELECT 
    members.id,
    users.id AS user_id,
    users.nickname,
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
  create,
  byDM,
  byID,
  inServerByUser,
};
