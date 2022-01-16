import axios from "axios";
import { useReducer, useEffect } from "react";
import serverReducer from "../reducers/serverReducer";
import {
  SET_SERVERS,
  SET_SERVER,
  SET_CHANNEL,
  SET_ACTIVE_USERS,
} from "../utils/constants";
import { getServer, getServers, getChannel } from "../network/serverApi";

const initialState = {
  server: "",
  servers: [],
  channel: "",
  channels: [],
  messages: [],
  members: [],
  active: [],
  tags: [],
};

export default function useServerData() {
  const [app, appDispatch] = useReducer(serverReducer, initialState);

  useEffect(() => {
    getServers(appDispatch);
  }, []);

  useEffect(() => {
    getChannel(appDispatch, app.channel);
  }, [app.channel]);

  const setServer = async (server) => {
    await getServer(appDispatch, server);
  };

  const setChannel = (channel) => {
    appDispatch({ type: SET_CHANNEL, channel });
  };

  return { app, setServer, setChannel };
}
