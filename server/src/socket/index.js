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
  });
  require("./events")(io);
};
