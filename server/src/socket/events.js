const Online = require("./helpers/online");
const User = require("../db/queries/users");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    /* socket object may be used to send specific messages to the new connected client */
    const user = await User.byId(socket.userId);
    Online.add(socket.id, user.username);
    const online = Online.all();

    console.log(`${user.username} connected`);
    socket.emit("connection", socket.id, online);
    io.emit("connected", `${user.username} connected`);

    socket.on("disconnect", async () => {
      const user = await User.byId(socket.userId);
      console.log(`${user.username} disconnected`);
      io.emit("disconnected", `${user.username} disconnected`);
      Online.remove(socket.id, user.username);
    });

    // Test event (when client clicks home button)
    socket.on("home click", (socketId, user) => {
      console.log(`${socketId} -> ${user} clicked home button`);
      io.to(socketId).emit("scare", `Server says: look behind you ${user}`);
    });

    // Test event (when client requests online members)
    socket.on("get online", async () => {
      const user = await User.byId(socket.userId);
      console.log(
        `${socket.id} -> ${user.username} requested to see online members`
      );
      const online = Online.all();
      io.to(socket.id).emit("online", online);
    });

    // test
    // socket.on("broadcast", async (msg) => {
    //   const user = await User.byId(socket.userId);
    //   console.log(`${socket.id} -> ${user.username} broadcasted ${msg}`);
    //   io.emit("message", `${user.username} says ${msg} to everyone`);
    // });
  });
};
