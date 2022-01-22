import {
  SET_USER,
  SET_MODE,
  SET_TOKENS,
  SET_SERVER,
  SET_SERVERS,
  SET_CHANNEL,
  SET_MEMBERS,
  SET_LOADING,
  SET_CHANNELS,
  SET_MESSAGES,
  SET_NEW_CHANNEL,
  SET_SOCKET,
  SET_ACTIVE_USERS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../utils/constants";
import { initialState } from "../contexts/AuthContext";

export default function reducer(state, action) {
  const {
    mode,
    user,
    tokens,
    server,
    servers,
    members,
    channel,
    channels,
    messages,
    socket,
    activeUsers,
  } = action;
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user,
      };
    case SET_TOKENS:
      return {
        ...state,
        tokens,
      };
    case SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers,
      };
    case SET_MODE:
      return {
        ...state,
        mode,
        loading: false,
      };
    case SET_SOCKET:
      return {
        ...state,
        socket,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        loading: false,
        authenticated: false,
      };
    case SET_SERVER:
      return {
        ...state,
        server,
        channels,
        channel,
        messages,
        members,
      };
    case SET_SERVERS:
      return {
        ...state,
        servers,
        loading: false,
      };
    case SET_CHANNEL:
      return {
        ...state,
        channel,
        messages,
      };
    case SET_CHANNELS:
      return {
        ...state,
        channels,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages,
      };
    case SET_MEMBERS:
      return {
        ...state,
        members,
      };
    case SET_NEW_CHANNEL:
      return {
        ...state,
        channels,
        channel,
        messages: [],
      };
    default:
      return { ...state, error: `Unsupported action type: ${action.type}` };
  }
}
