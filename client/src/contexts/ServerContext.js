import reducer from "../reducers/reducer";
import { createContext, useContext, useReducer } from "react";
import {
  SET_CHANNEL,
  SET_SERVER,
  SET_MEMBERS,
  SET_SERVERS,
  SET_CHANNELS,
  SET_MESSAGES,
  SET_NEW_CHANNEL,
  SET_ACTIVE_USERS,
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
  activeUsers: [],
};

export const ServerProvider = ({ children }) => {
  const [app, appDispatch] = useReducer(reducer, initialState);
  const { state } = useContext(AuthContext);

  const setServers = (servers) => {
    appDispatch({
      type: SET_SERVERS,
      servers,
    });
  };

  const setServer = (server) => {
    appDispatch({
      type: SET_SERVER,
      server,
      channels: server?.channels || [],
      channel: server?.channels[0],
      messages: server?.channels[0]?.messages || [],
      members: server.members,
    });
  };

  const setChannels = (channels) => {
    appDispatch({
      type: SET_CHANNELS,
      channels,
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
    const messages = [...app.messages, message];
    appDispatch({
      type: SET_MESSAGES,
      messages,
    });
  };

  const setNewChannel = (channel) => {
    appDispatch({
      type: SET_NEW_CHANNEL,
      channels: [...app.channels, channel],
      channel,
    });
  };

  const setActiveUsers = (activeUsers) => {
    appDispatch({
      type: SET_ACTIVE_USERS,
      activeUsers,
    });
  };

  const setMembers = (members) => {
    appDispatch({
      type: SET_MEMBERS,
      members,
    });
  };

  return (
    <ServerContext.Provider
      value={{
        app,
        setServer,
        setChannel,
        setServers,
        setMembers,
        setMessages,
        setChannels,
        appDispatch,
        setNewChannel,
        setNewServers,
        setActiveUsers,
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
