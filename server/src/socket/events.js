const Online = require("./helpers/online");
const User = require("../db/queries/users");
const Server = require("../db/queries/servers");
const {
  CHANNEL_MESSAGE,
  SERVER_JOIN,
  SERVER_LEAVE,
  MEMBER_JOIN,
} = require("./helpers/constants");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    /* socket object may be used to send specific messages to the new connected client */
    const join = (serverId) => {
      console.log(`${socket.userId} joined ${serverId}`);
      socket.join(`SERVER_${serverId}`);
      socket
        .to(`SERVER_${serverId}`)
        .emit(SERVER_JOIN, socket.userId, serverId);
    };
    const leave = (oldId) => {
      console.log(`${socket.userId} left ${oldId}`);
      socket.leave(`SERVER_${oldId}`);
      socket.to(`SERVER_${oldId}`).emit(SERVER_LEAVE, socket.userId, oldId);
    };

    const messageServer = (message) => {
      socket.to(`SERVER_${message.server_id}`).emit(CHANNEL_MESSAGE, message);
    };
    const members = (members, serverId) => {
      socket.to(`SERVER_${serverId}`).emit(MEMBER_JOIN, members);
    };

    const user = await User.setActive(socket.userId);
    // add this new user to online map
    Online.add(socket.id, user.id);
    // get all online users (app-wide)
    const online = Online.all();

    console.log(`${user.username} connected`);
    socket.emit("login", online);

    // Notifying everyone on server (adds user to activeUsers)
    socket.broadcast.emit("connection", online);

    // Disconnection
    socket.on("disconnect", async () => {
      const user = await User.setInactive(socket.userId);
      Online.remove(socket.id, user.id);
      console.log(`${user.username} disconnected`);
      const online = Online.all();
      io.emit("disconnection", online);
    });

    socket.on(SERVER_JOIN, join);
    socket.on(SERVER_LEAVE, leave);
    socket.on(CHANNEL_MESSAGE, messageServer);
    socket.on(MEMBER_JOIN, members);
  });
};

/* 
  // Test event -> (when client clicks home button)
  socket.on("home click", (socketId, username) => {
    console.log(`${socketId} -> ${username} clicked home button`);
    socket.emit("scare", `Server says: look behind you ${username}`);
  });

  // Test event -> (when client requests online members)
  socket.on("get online", async () => {
    const user = await User.byID(socket.userId);
    console.log(
      `${socket.id} -> ${user.username} requested to see online members`
    );
    const online = Online.all();
    io.to(socket.id).emit("get online", online);
  });
*/
