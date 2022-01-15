const onlineUsers = new Map();

const add = (socketId, username) => {
  // TODO: uncomment this for multi-device compatibility
  // BUT make sure you emit online/offline once only for each user
  // regardless of how many devices (sockets) they have open

  if (onlineUsers.has(username)) {
    onlineUsers.get(username).add(socketId);
  } else {
    onlineUsers.set(username, new Set([socketId]));
  }
};

const remove = (socketId, username) => {
  if (onlineUsers.has(username)) {
    let userSocketIds = onlineUsers.get(username);
    userSocketIds.delete(socketId);

    if (userSocketIds.size === 0) onlineUsers.delete(username);
  }
};

const all = () => [...onlineUsers.keys()];

module.exports = { add, remove, all };
