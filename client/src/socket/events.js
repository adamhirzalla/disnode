module.exports = (socket) => {
  socket.on("connection", (socket, online) => {
    console.log(`Socket connected to back-end: ${socket}`);
    console.log(`Online users: `, online);
  });

  socket.on("scare", (msg) => {
    console.log(msg);
  });

  socket.on("message", (msg) => {
    console.log(msg);
  });

  socket.on("online", (msg) => {
    console.log(msg);
  });

  socket.on("connected", (msg) => {
    console.log(msg);
  });

  socket.on("disconnected", (msg) => {
    console.log(msg);
  });
};
