import axios from "axios";

// get all of the server user has joined
export const getServers = async () => {
  try {
    const res = await axios.get("/api/servers");
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

export const createServer = async (title, logo) => {
  try {
    const res = await axios.post(`/api/servers`, { title, logo });
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to create server ", e);
  }
};

export const createTags = async (tags, serverId) => {
  try {
    const res = await axios.put(`/api/servers/${serverId}/tags`, { tags });
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to create server ", e);
  }
};
