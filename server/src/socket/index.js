const jwt = require("jsonwebtoken");
module.exports = (io) => {
  io.use((socket, next) => {
    const { accessToken } = socket.handshake.auth;
    try {
      socket.userId = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)?.id;
      next();
    } catch (e) {
      return next(new Error("Unauthorized: Invalid Token"));
    }
  }).on("connection", (socket) => {
    /* socket object may be used to send specific messages to the new connected client */
    console.log("new client connected");
    socket.emit("connection", null);
  });
};
