import reducer from "../reducers/reducer";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  HOME,
  SET_MODE,
  SET_CHANNEL,
  SET_SERVER,
  SET_MEMBERS,
  SET_SERVERS,
  SET_CHANNELS,
  SET_MESSAGES,
  SET_NEW_CHANNEL,
  SET_ACTIVE_USERS,
} from "../utils/constants";
import { getServers } from "../network/serverApi";
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
  mode: null,
  loading: true,
};

export const ServerProvider = ({ children }) => {
  const [app, appDispatch] = useReducer(reducer, initialState);
  const { state } = useContext(AuthContext);

  // landing socket connection and serverlist load
  useEffect(async () => {
    if (state.authenticated) {
      const servers = await getServers();
      setServers(servers);
      if (!app.mode) setMode(HOME);
    }
  }, [state.authenticated]);

  useEffect(async () => {
    const members = app.members.map((member) => {
      return {
        ...member,
        is_active: state.activeUsers.includes(member.user_id),
      };
    });
    setMembers(members);
  }, [state.activeUsers]);

  const setMode = (mode) => {
    appDispatch({
      type: SET_MODE,
      mode,
    });
  };

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
    const channel = app.channels.find((channel) => channel.id === channelId);
    appDispatch({
      type: SET_CHANNEL,
      channel,
      messages: channel?.messages || [],
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
        appDispatch,
        setMode,
        setServer,
        setChannel,
        setServers,
        setMembers,
        setMessages,
        setChannels,
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
