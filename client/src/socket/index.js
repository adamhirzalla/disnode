import io from "socket.io-client";

const tokens = localStorage.DisnodeTokens;
const { accessToken } = tokens ? JSON.parse(tokens) : {};
const sio = io(process.env.REACT_APP_WEBSOCKET_URL, {
  auth: {
    accessToken,
  },
});
require("./events")(sio);

export default sio;
