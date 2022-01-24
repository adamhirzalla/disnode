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
    const res = await axios.post(`/api/servers/${serverId}/tags`, { tags });
    const server = res.data;
    return server;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to create server ", e);
  }
};

// search server/servers with inviteCode or title
export const searchServers = async (server) => {
  const { title, inviteCode } = server;
  try {
    if (title) {
      const res = await axios.get(`/api/servers?title=${title}`);
      const servers = res.data;
      return servers;
    }
    const res = await axios.get(`/api/servers?invite_code=${inviteCode}`);
    const server = res.data;
    if (server) return [server];
  } catch (e) {
    console.log("Failed to search server ", e);
  }
};

// update server
export const updateServer = async (serverId, data) => {
  try {
    const res = await axios.put(`/api/servers/${serverId}`, { data });
    const server = res.data;
    return server;
  } catch (e) {
    console.log("Failed to update server ", e);
  }
};
