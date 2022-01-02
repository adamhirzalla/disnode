module.exports = (socket) => {
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
};
