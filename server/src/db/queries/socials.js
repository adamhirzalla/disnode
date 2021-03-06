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

const add = (userId, iconId, url) => {
  const query = `
  INSERT INTO socials (user_id, icon_id, url)
  VALUES ($1, $2, $3)
  ON CONFLICT (user_id, icon_id) DO UPDATE
    SET url = $3;`;

  const params = [userId, iconId, url];
  return db.query(query, params);
};

const addMultiple = async (userId, socials) => {
  const queries = socials.map((social) => {
    add(userId, social.id, social.url);
  });
  return Promise.all(queries);
};

/* 
// const current = await byUser(userId).map((e) => e.id)
   const membersQueries = servers.map((server) =>
        Member.byServer(server.id)
      );
      return Promise.all(membersQueries).then((members) => {
        servers.forEach((server, i) => {
          server.members = members[i];
        });
        return servers;
      });
  */
// const params1 = [userId];
// return db.query(query, params).then((res) => res.rows);
// };

// // update - edit
// const editSocials = (userId, iconId, profile) => {
//   const url = profile[iconId].url;
//   // const { icon_id, url } = social;
//   // social: {{1: {url: "asdf"}}, {{2: {url: "asdf"}} }
//   const query = `
//   UPDATE socials
//   SET user_id = $1,
//   icon_id = $2,
//   url = $3
//   RETURNING *
//   `;
//   const params = [userId, iconId, url];
//   return db.query(query, params).then((res) => res.rows[0]);
// };

// // create
// const createSocials = (userId, iconId, profile) => {
//   const url = profile[iconId].url;
//   const query = `
//   INSERT INTO socials
//   (user_id, icon_id, url)
//   VALUES ($1, $2, $3);
//   `;
//   const params = [userId, iconId, url];
//   return db.query(query, params).then((res) => res.rows);
// };

// // delete
// const deleteSocials = (userId, iconId) => {
//   const query = `
//   DELETE from socials
//   WHERE user_id = $1
//   AND icon_id = $2;
//   `;
//   const params = [userId, iconId];
//   return db.query(query, params).then((res) => res.rows);
// };

module.exports = {
  byUser,
  add,
  addMultiple,
  // editSocials,
  // createSocials,
  // deleteSocials,
};

// so if we need to create/edit/delete it would have the status
// if not then it would be null
// so we have 6 icons now.
// 1: null
// 2: {url: '', status: 'delete'}
// 3: {url: 'https://blizzard.com1', status: 'edit'}
// 4:
// status: "create"
// url: "44"
// [[Prototype]]: Object
// 5: null
// 6: null
