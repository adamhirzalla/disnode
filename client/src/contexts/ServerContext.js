import reducer from "../reducers/reducer";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SET_CHANNEL,
  SET_SERVER,
  SET_SERVERS,
  SET_MESSAGES,
  SET_NEW_CHANNEL,
} from "../utils/constants";
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

  const setServer = (server) => {
    appDispatch({
      type: SET_SERVER,
      server,
      channels: server.channels || [],
      channel: server.channels[0],
      messages: server?.channels[0]?.messages || [],
      members: server.members,
    });
  };

  const setServers = (servers) => {
    appDispatch({
      type: SET_SERVERS,
      servers,
    });
  };

  const setNewServers = (servers) => {
    appDispatch({
      type: SET_SERVERS,
      servers,
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

  const setMessages = (message) => {
    appDispatch({
      type: SET_MESSAGES,
      messages: [...app.messages, message],
    });
  };

  const setNewChannel = (channel) => {
    appDispatch({
      type: SET_NEW_CHANNEL,
      channels: [...app.channels, channel],
      channel,
    });
  };

  return (
    <ServerContext.Provider
      value={{
        app,
        appDispatch,
        setServer,
        setChannel,
        setMessages,
        setServers,
        setNewChannel,
        setNewServers,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

//  const setMessages = async () => {
//   const oldMessages = await getMessages();
//   console.log(oldMessages);
//   appDispatch({
//     type: SET_MESSAGES,
//     messages: [...oldMessages, ...app.messages],
//   });
// };
