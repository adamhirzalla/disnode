import axios from "axios";

// get all of the server user has joined
export const getServers = async () => {
  try {
    const res = await axios.post("/api/servers");
    const servers = res.data;
    return servers;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive servers data", e);
  }
};

// get all of the data for a server
export const getServer = async (serverId) => {
  try {
    const res = await axios.post(`/api/servers/${serverId}`);
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive server data", e);
  }
};
