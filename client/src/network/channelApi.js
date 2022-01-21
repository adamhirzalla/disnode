import axios from "axios";

// create new channel
export const createChannel = async (serverId, title) => {
  try {
    const res = await axios.post(`/api/servers/${serverId}/channels`, title);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive channel data", e);
  }
};

// get channels for a server
export const getChannels = async (serverId) => {
  try {
    const res = await axios.get(`/api/servers/${serverId}/channels`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive channel data", e);
  }
};
