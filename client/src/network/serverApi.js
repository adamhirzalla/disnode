import axios from "axios";
import {
  SET_SERVERS,
  SET_SERVER,
  SET_CHANNEL,
  SET_ACTIVE_USERS,
} from "../utils/constants";

// get all of the server user has joined
export const getServers = async (dispatch) => {
  try {
    const res = await axios.get("/api/servers");
    const servers = res.data;
    dispatch({
      type: SET_SERVERS,
      servers,
    });
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive servers information", e);
  }
};

// get all of the data for a server
export const getServer = async (dispatch, server) => {
  try {
    const res = await axios.get(`/api/servers/${server}`);
    const { channels, channel, messages, members, tags } = res.data;
    dispatch({
      type: SET_SERVER,
      server,
      channels: channels[0],
      // channel,
      messages,
      members,
      tags,
    });
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive channels information", e);
  }
};

// get all of the messages for a channel
export const getChannel = async (dispatch, channel) => {
  try {
    const res = await axios.get(`/api/servers/${channel}/messages`);
    const messages = res.data;
    dispatch({
      type: SET_CHANNEL,
      channel,
      messages,
    });
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive channels information", e);
  }
};
