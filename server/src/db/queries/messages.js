const db = require("../index");
const Views = require("./views");

// TODO: add type as parameter (img/text/code)
const sendToChannel = (data) => {
  const { senderId, body, channelId } = data;
  const query = `
  INSERT INTO messages
    (sender_id, body, channel_id)
  VALUES ($1, $2, $3)
  RETURNING 
    id,
    body,
    sent_at,
    sender_id  ;
  `;
  const params = [senderId, body, channelId];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byChannel = (channelId, userId) => {
  const query = `
  SELECT
    messages.id,
    users.nickname AS sender_nickname,
    users.avatar AS sender_avatar,
    messages.sender_id,
    body,
    sent_at
  FROM messages
  JOIN channels ON channel_id = channels.id
  JOIN users ON sender_id = users.id
  WHERE channel_id = $1
  `;
  const params = [channelId];
  return db
    .query(query, params)
    .then((res) => res.rows)
    .then((messages) => {
      const viewsQueries = messages.map((message) =>
        Views.byMessage(message, userId)
      );
      return Promise.all(viewsQueries).then((views) => {
        messages.forEach((message, i) => {
          message.views = views[i];
        });
        return messages;
      });
    });
};

module.exports = {
  sendToChannel,
  byChannel,
};
