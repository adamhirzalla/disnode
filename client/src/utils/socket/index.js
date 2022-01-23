import io from "socket.io-client";

const tokens = localStorage.DisnodeTokens;
const { accessToken } = tokens ? JSON.parse(tokens) : {};
const socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
  auth: {
    accessToken,
  },
});
// require("./events")(socket);

export default socket;
