import { createContext, useContext, useEffect, useReducer } from "react";
import { getServers } from "../network/serverApi";
import reducer from "../reducers/reducer";
import { SET_CHANNEL, SET_SERVER, SET_SERVERS } from "../utils/constants";
import AuthContext from "./AuthContext";

const ServerContext = createContext();
export default ServerContext;

export const initialState = {
  server: null,
  servers: [],
  channel: null,
  channels: [],
  messages: [],
  members: [],
  active: [],
};

export const ServerProvider = ({ children }) => {
  const [app, appDispatch] = useReducer(reducer, initialState);
  const { state } = useContext(AuthContext);

  useEffect(async () => {
    if (!state.loading) {
      const servers = await getServers();
      appDispatch({
        type: SET_SERVERS,
        servers,
      });
    }
  }, [state.authenticated]);

  const setServer = (server) => {
    appDispatch({
      type: SET_SERVER,
      server,
      channels: server.channels,
      channel: server?.channels[0],
      messages: server?.channels[0].messages,
      members: server.members,
    });
  };

  const setChannel = (channelId) => {
    const [channel] = app.channels.filter(
      (channel) => channel.id === channelId
    );
    appDispatch({
      type: SET_CHANNEL,
      channel,
      messages: channel.messages || [],
    });
  };

  return (
    <ServerContext.Provider value={{ app, appDispatch, setServer, setChannel }}>
      {children}
    </ServerContext.Provider>
  );
};
