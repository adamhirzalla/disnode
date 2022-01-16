const db = require("../index");
const Messages = require("./messages");

const byUser = (userId) => {
  const query = `
  SELECT servers.id, 
    servers.title, 
    servers.image AS logo
  FROM servers
  JOIN members ON server_id = servers.id
  JOIN users ON user_id = users.id
  WHERE user_id = $1
  `;
  const params = [userId];
  return db.query(query, params).then((res) => res.rows);
};

const byID = (serverId, userId) => {
  const serverQuery = db
    .query(
      `
      SELECT 
      id,
      title,
      image AS logo,
      creator_id AS owner_id,
      invite_code
    FROM servers
    WHERE id = $1
  `,
      [serverId]
    )
    .then((res) => res.rows[0]);

  const membersQuery = db
    .query(
      `
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
  `,
      [serverId]
    )
    .then((res) => res.rows);

  const tagsQuery = db
    .query(
      `
  SELECT 
    tags.id,
    tags.name
  FROM tags
  JOIN server_tags ON tags.id = tag_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  `,
      [serverId]
    )
    .then((res) => res.rows);

  const channelsQuery = db
    .query(
      `
  SELECT 
    channels.id,
    channels.title,
    channels.creator_id
  FROM channels
  JOIN users ON users.id = creator_id
  JOIN servers ON servers.id = server_id
  WHERE server_id = $1
  `,
      [serverId]
    )
    .then((res) => res.rows);

  return Promise.all([serverQuery, membersQuery, tagsQuery, channelsQuery])
    .then(([server, members, tags, channels]) => {
      return { ...server, members, tags, channels };
    })
    .then((serverData) => {
      const messageQueries = serverData.channels.map((channel) =>
        Messages.byChannel(channel.id)
      );
      return Promise.all(messageQueries).then((messages) => {
        serverData.channels.forEach((channel, i) => {
          channel.messages = messages[i];
        });
        return serverData;
      });
    });
};

module.exports = {
  byUser,
  byID,
};
