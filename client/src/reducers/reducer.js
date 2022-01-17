import {
  SET_LOADING,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_ACTIVE_USERS,
  SET_TOKENS,
  SET_SERVER,
  SET_SERVERS,
  SET_CHANNEL,
  SET_MESSAGE,
} from "../utils/constants";
import { initialState } from "../contexts/AuthContext";

export default function reducer(state, action) {
  const {
    user,
    activeUsers,
    tokens,
    server,
    servers,
    channel,
    channels,
    messages,
    members,
    active,
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
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        loading: false,
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
      };
    case SET_CHANNEL:
      return {
        ...state,
        channel,
        messages,
      };
    case SET_ACTIVE_USERS:
      return {
        ...state,
        active,
      };
    case SET_MESSAGE:
      return {
        ...state,
        messages,
      };
    default:
      return { ...state, error: `Unsupported action type: ${action.type}` };
  }
}
