module.exports = (socket) => {
  socket.on("login", (online) => {
    console.log(`Socket connected to back-end!`);
    console.log(`Online UserIDs: `, online);
  });

  socket.on("scare", (msg) => {
    console.log(msg);
  });
  socket.on("get online", (msg) => {
    console.log(msg);
  });

  socket.on("message", (msg) => {
    console.log(msg);
  });

  // when any user connects (global)
  socket.on("connection", (activeUsers) => {
    console.log(`user connected:`, activeUsers);
  });

  // when any user disconnects (global)
  socket.on("disconnection", (msg) => {
    console.log(`user disconnected:`, msg);
  });
};
