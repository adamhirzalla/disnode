import {
  SET_SERVER,
  SET_SERVERS,
  SET_CHANNEL,
  SET_ACTIVE_USERS,
} from "../utils/constants";

export default function serverReducer(state, action) {
  const {
    server,
    servers,
    channel,
    channels,
    messages,
    members,
    active,
    tags,
  } = action;
  switch (action.type) {
    case SET_SERVER:
      return {
        ...state,
        server,
        channels,
        channel: channels[0],
        messages,
        members,
        tags,
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

    default:
      return { ...state, error: `Unsupported action type: ${action.type}` };
  }
}
