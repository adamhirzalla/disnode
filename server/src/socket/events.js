const Online = require("./helpers/online");
const User = require("../db/queries/users");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    /* socket object may be used to send specific messages to the new connected client */
    const user = await User.setActive(socket.userId);

    Online.add(socket.id, user.id);

    const online = Online.all();

    console.log(`${user.username} connected`);
    socket.emit("login", online);
    io.emit("connection", online);

    socket.on("disconnect", async () => {
      const user = await User.setInactive(socket.userId);
      Online.remove(socket.id, user.id);
      console.log(`${user.username} disconnected`);
      const online = Online.all();
      io.emit("disconnection", online);
    });

    // Test event (when client clicks home button)
    socket.on("home click", (socketId, username) => {
      console.log(`${socketId} -> ${username} clicked home button`);
      io.to(socketId).emit("scare", `Server says: look behind you ${username}`);
    });

    // Test event (when client requests online members)
    socket.on("get online", async () => {
      const user = await User.byID(socket.userId);
      console.log(
        `${socket.id} -> ${user.username} requested to see online members`
      );
      const online = Online.all();
      io.to(socket.id).emit("get online", online);
    });

    // test
    // socket.on("broadcast", async (msg) => {
    //   const user = await User.byID(socket.userId);
    //   console.log(`${socket.id} -> ${user.username} broadcasted ${msg}`);
    //   io.emit("message", `${user.username} says ${msg} to everyone`);
    // });
  });
};
