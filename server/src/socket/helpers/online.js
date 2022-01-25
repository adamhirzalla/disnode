const onlineUsers = new Map(); // App-wide
const channels = new Map(); // Per-server

const add = (socketId, userId) => {
  // TODO: uncomment this for multi-device compatibility
  // BUT make sure you emit online/offline once only for each user
  // regardless of how many devices (sockets) they have open

  if (onlineUsers.has(userId)) {
    onlineUsers.get(userId).add(socketId);
  } else {
    onlineUsers.set(userId, new Set([socketId]));
  }
};

const remove = (socketId, userId) => {
  if (onlineUsers.has(userId)) {
    let userSocketIds = onlineUsers.get(userId);
    userSocketIds.delete(socketId);

    if (userSocketIds.size === 0) onlineUsers.delete(userId);
  }
};

const all = () => [...onlineUsers.keys()];

const addToChannel = (userId, channelId) => {
  if (channels.has(channelId)) {
    channels.get(channelId).add(userId);
  } else {
    channels.set(channelId, new Set([userId]));
  }
};

const removeFromChannel = (userId, channelId) => {
  if (channels.has(channelId)) {
    let members = channels.get(channelId);
    members.delete(userId);

    if (members.size === 0) channels.delete(channelId);
  }
};

const allInChannel = (channelId) => {
  if (channels.has(channelId)) return [...channels.get(channelId)];
};

module.exports = {
  add,
  remove,
  all,
  addToChannel,
  removeFromChannel,
  allInChannel,
};
