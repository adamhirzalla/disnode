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
  mode: HOME,
  loading: true,
};

export const ServerProvider = ({ children }) => {
  const [app, appDispatch] = useReducer(reducer, initialState);
  const { state } = useContext(AuthContext);
  const { socket, authenticated } = state;

  // get user servers when user is authenticated (after load)
  useEffect(async () => {
    if (state.authenticated) {
      const servers = await getServers();
      setServers(servers);
      if (!app.mode) setMode(HOME);
    }
  }, [state.authenticated]);

  // SOCKETS //

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
    });
  };

  // retired (use newChannel for creating new channels)
  const setChannels = (channel) => {
    appDispatch({
      type: SET_CHANNELS,
      channel,
    });
  };

  const setChannel = (channelId) => {
    appDispatch({
      type: SET_CHANNEL,
      channelId,
    });
  };

  const setMessages = (message) => {
    appDispatch({
      type: SET_MESSAGES,
      message,
    });
  };

  const setNewChannel = (channel) => {
    appDispatch({
      type: SET_NEW_CHANNEL,
      channel,
    });
  };

  // retired (used directly in authcontext)
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
