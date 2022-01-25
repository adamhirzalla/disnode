const Online = require("./helpers/online");
const User = require("../db/queries/users");
const Server = require("../db/queries/servers");
const Message = require("../db/queries/messages");
const View = require("../db/queries/views");
const {
  CHANNEL_MESSAGE,
  SERVER_JOIN,
  SERVER_LEAVE,
  MEMBER_UPDATE,
  MEMBER_KICK,
  SERVER_EDIT,
  SERVERS_UPDATE,
  CHANNEL_EDIT,
  CHANNEL_DELETE,
  CHANNEL_NEW,
  MESSAGE_DELETE,
  CHANNEL_JOIN,
  MESSAGE_VIEW,
  CHANNEL_LEAVE,
} = require("./helpers/constants");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    /* socket object may be used to send specific messages to the new connected client */
    const join = (serverId) => {
      console.log(`${socket.userId} joined server ${serverId}`);
      socket.join(`SERVER_${serverId}`);
      socket
        .to(`SERVER_${serverId}`)
        .emit(SERVER_JOIN, socket.userId, serverId);
    };
    const leave = (oldId) => {
      console.log(`${socket.userId} left server ${oldId}`);
      socket.leave(`SERVER_${oldId}`);
      socket.to(`SERVER_${oldId}`).emit(SERVER_LEAVE, socket.userId, oldId);
    };

    const messageServer = async (message) => {
      const inChannel = Online.allInChannel(message.channel_id);
      const userId = socket.userId;
      if (inChannel?.length) {
        const viewsQueries = inChannel.map((userId) => {
          View.add(message, userId);
        });
        await Promise.all(viewsQueries);
        const views = await View.byMessage(message, userId);
        message.views = views;
      }
      io.to(`SERVER_${message.server_id}`).emit(CHANNEL_MESSAGE, message);
    };
    const updateMembers = (members, serverId) => {
      socket.to(`SERVER_${serverId}`).emit(MEMBER_UPDATE, members);
    };
    const kickMember = (member, serverId) => {
      socket.to(`SERVER_${serverId}`).emit(MEMBER_KICK, member);
    };
    const editServer = (server) => {
      socket.to(`SERVER_${server.id}`).emit(SERVER_EDIT, server);
    };
    const updateServers = () => {
      socket.broadcast.emit(SERVERS_UPDATE);
    };
    const editChannel = (channel) => {
      socket.to(`SERVER_${channel.server_id}`).emit(CHANNEL_EDIT, channel);
    };
    const deleteChannel = (channel) => {
      socket.to(`SERVER_${channel.server_id}`).emit(CHANNEL_DELETE, channel);
    };
    const newChannel = (channel) => {
      console.log(channel);
      socket.to(`SERVER_${channel.server_id}`).emit(CHANNEL_NEW, channel);
    };
    const deleteMessage = (message) => {
      socket.to(`SERVER_${message.server_id}`).emit(MESSAGE_DELETE, message);
    };
    const joinChannel = async (channel) => {
      // console.log();
      const userId = socket.userId;
      socket.join(`CHANNEL_${channel.id}`);
      Online.addToChannel(userId, channel.id);
      console.log(`${socket.userId} joined channel ${channel.id}`);
      const inChannel = Online.allInChannel(channel.id);
      console.log("users in channel", inChannel);
      const messages = await Message.byChannel(channel.id);

      const viewsQueries = messages.map((message) =>
        View.byMessage(message, userId)
      );
      const views = await Promise.all(viewsQueries);
      messages.forEach((message, i) => {
        message.views = views[i];
      });
      socket
        .to(`SERVER_${channel.server_id}`)
        .emit(MESSAGE_VIEW, messages, channel.id);
    };

    const leaveChannel = (oldId) => {
      const userId = socket.userId;
      Online.removeFromChannel(userId, oldId);
      console.log(`${socket.userId} left channel ${oldId}`);
      const inChannel = Online.allInChannel(oldId);
      console.log("users in channel", inChannel);
      socket.leave(`CHANNEL_${oldId}`);
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
    socket.on(MEMBER_UPDATE, updateMembers);
    socket.on(MEMBER_KICK, kickMember);
    socket.on(SERVER_EDIT, editServer);
    socket.on(SERVERS_UPDATE, updateServers);
    socket.on(CHANNEL_EDIT, editChannel);
    socket.on(CHANNEL_DELETE, deleteChannel);
    socket.on(CHANNEL_NEW, newChannel);
    socket.on(MESSAGE_DELETE, deleteMessage);
    socket.on(CHANNEL_JOIN, joinChannel);
    socket.on(CHANNEL_LEAVE, leaveChannel);
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
