const Tag = require("./tags");
const db = require("../index");
const Member = require("./members");
const Message = require("./messages");
const Channel = require("./channels");

const create = (data) => {
  const { creatorId, title, logo, invite_code } = data;
  const query = `
  INSERT INTO servers 
  (creator_id, title, logo, invite_code)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  const params = [creatorId, title, logo, invite_code];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byUser = (userId) => {
  const query = `
  SELECT servers.id, 
    servers.title, 
    servers.logo
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
    logo,
    creator_id AS owner_id,
    invite_code
  FROM servers
  WHERE id = $1
  `,
      [serverId]
    )
    .then((res) => res.rows[0]);

  return Promise.all([
    serverQuery,
    Member.byServer(serverId),
    Tag.byServer(serverId),
    Channel.byServer(serverId, userId),
  ]).then(([server, members, tags, channels]) => {
    return { ...server, members, tags, channels };
  });
};

const byTitle = (title) => {
  const query = `
  SELECT 
    id,
    title,
    logo,
    creator_id AS owner_id
  FROM servers
  WHERE LOWER(title) LIKE LOWER($1)
  `;
  const params = [`%${title}%`];
  return db
    .query(query, params)
    .then((res) => res.rows)
    .then((servers) => {
      const membersQueries = servers.map((server) =>
        Member.byServer(server.id)
      );
      const tagsQueries = servers.map((server) => Tag.byServer(server.id));
      return Promise.all(membersQueries).then((members) => {
        return Promise.all(tagsQueries).then((tags) => {
          servers.forEach((server, i) => {
            server.members = members[i];
            server.tags = tags[i];
          });
          return servers;
        });
      });
    });
};

const byTags = (tags) => {
  const query = `
  SELECT DISTINCT
    servers.id,
    title,
    logo,
    creator_id AS owner_id
  FROM servers
  JOIN server_tags ON servers.id = server_id
  JOIN tags ON tags.id = tag_id
  WHERE tag_id = ANY(ARRAY[${tags}]);
  `;
  return db
    .query(query)
    .then((res) => res.rows)
    .then((servers) => {
      const membersQueries = servers.map((server) =>
        Member.byServer(server.id)
      );
      const tagsQueries = servers.map((server) => Tag.byServer(server.id));
      return Promise.all(membersQueries).then((members) => {
        return Promise.all(tagsQueries).then((tags) => {
          servers.forEach((server, i) => {
            server.members = members[i];
            server.tags = tags[i];
          });
          return servers;
        });
      });
    });
};

const byCode = (code) => {
  const query = `
  SELECT 
    id,
    title,
    logo,
    creator_id AS owner_id
  FROM servers
  WHERE invite_code = $1
  `;
  const params = [code];
  return db
    .query(query, params)
    .then((res) => res.rows[0])
    .then((server) => {
      if (!server) return;
      return Promise.all([
        Member.byServer(server.id),
        Tag.byServer(server.id),
      ]).then(([members, tags]) => {
        return { ...server, members, tags };
      });
    });
};

const byTags = (tags) => {
  const query = `
  SELECT DISTINCT  
    servers.id,
    title,
    logo,
    creator_id AS owner_id
  FROM servers
  JOIN server_tags ON servers.id = server_id
  JOIN tags ON tags.id = tag_id
  WHERE tag_id = ANY(ARRAY[${tags}])
  `;
  return db
    .query(query)
    .then((res) => res.rows)
    .then((servers) => {
      const membersQueries = servers.map((server) =>
        Member.byServer(server.id)
      );
      const tagsQueries = servers.map((server) => Tag.byServer(server.id));
      return Promise.all(membersQueries).then((members) => {
        return Promise.all(tagsQueries).then((tags) => {
          servers.forEach((server, i) => {
            server.members = members[i];
            server.tags = tags[i];
          });
          return servers;
        });
      });
    });
};

const createTags = (tagIds, serverId) => {
  const tagQueries = tagIds.map((tagId) => {
    return db
      .query(
        `
      INSERT INTO server_tags 
      (tag_id, server_id)
      VALUES ($1, $2)
      RETURNING (
        SELECT name FROM tags
        WHERE tags.id = tag_id
      );
  `,
        [tagId, serverId]
      )
      .then((res) => res.rows[0]);
  });

  return Promise.all(tagQueries);
};

const update = (data, serverId) => {
  const { logo, title } = data;
  const serverQuery = db
    .query(
      `
  UPDATE servers
  SET logo = $1,
  title = $2
  WHERE id = $3
  RETURNING *
  `,
      [logo, title, serverId]
    )
    .then((res) => res.rows[0]);

  return Promise.all([serverQuery, Tag.byServer(serverId)]).then(
    ([server, tags]) => ({
      ...server,
      tags,
    })
  );
};

const all = () => {
  const queries = `
  SELECT 
  id,
  title,
  logo,
  creator_id AS owner_id
  FROM servers
`;
  return db
    .query(queries)
    .then((res) => res.rows)
    .then((servers) => {
      const membersQueries = servers.map((server) =>
        Member.byServer(server.id)
      );
      const tagsQueries = servers.map((server) => Tag.byServer(server.id));
      return Promise.all(membersQueries).then((members) => {
        return Promise.all(tagsQueries).then((tags) => {
          servers.forEach((server, i) => {
            server.members = members[i];
            server.tags = tags[i];
          });
          return servers;
        });
      });
    });
};

module.exports = {
  byUser,
  byTitle,
  byCode,
  byTags,
  byID,
  create,
  createTags,
  update,
  all,
  byTags,
};
