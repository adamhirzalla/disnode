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
  DELETE_CHANNEL,
  SET_NEW_CHANNEL,
  DELETE_MEMBER,
  SET_SOCKET,
  SET_ACTIVE_USERS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  EDIT_CHANNEL,
  EDIT_SERVER,
  DELETE_MESSAGE,
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
    member,
    messages,
    message,
    socket,
    channelId,
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
    case SET_SERVER: {
      const channels = Object.values(server?.channels);
      console.log("Server", state.server.id, "->", server.id);
      return {
        ...state,
        server,
        channels: server?.channels || {},
        channel: channels[0],
        messages: channels[0]?.messages || [],
        members: server.members,
      };
    }
    case SET_SERVERS:
      return {
        ...state,
        servers,
        loading: false,
      };
    case SET_CHANNEL: {
      const channels = Object.values(state?.channels);
      const channel = { ...channels.find((c) => c.id === channelId) };
      return {
        ...state,
        channel,
        messages: channel.messages || [],
      };
    }
    case EDIT_CHANNEL: {
      // const channelsData = Object.values(state?.channels);
      const updatedChannel = { ...state.channel, ...channel };
      state.channels[channel.id] = updatedChannel;
      // const channel = { ...channels.find((c) => c.id === channelId) };
      return {
        ...state,
        // channels,
        channel: updatedChannel,
        // messages: channelsData[0].messages || [],
      };
    }
    case DELETE_CHANNEL: {
      delete state?.channels[channel.id];
      const channelsData = Object.values(state?.channels);
      // const channel = { ...channels.find((c) => c.id === channelId) };
      return {
        ...state,
        // channels,
        channel: channelsData[0] || {},
        messages: channelsData[0].messages || [],
      };
    }
    case DELETE_MEMBER: {
      // delete state?.channels[channel.id];
      const members = state.members.filter((m) => m.id !== member.id);
      // const channelsData = Object.values(state?.channels);
      // const channel = { ...channels.find((c) => c.id === channelId) };
      return {
        ...state,
        // channels,
        // channel: channelsData[0] || {},
        // messages: channelsData[0].messages || [],
        members,
      };
    }
    case DELETE_MESSAGE: {
      const messages = state.messages.filter((msg) => msg.id !== message.id);
      // state.channels[message.channel_id].messages = messages;

      return {
        ...state,
        channel: { ...state.channel, messages },
        channels: {
          ...state.channels,
          [message.channel_id]: { ...state.channel, messages },
        },
        messages,
      };
    }
    case SET_CHANNELS: // dont use
      // retired (use NEW_CHANNEL instead)
      // const channels = []
      return {
        ...state,
        server: { ...state.server, channels },
        channels,
      };
    case SET_MESSAGES: {
      // const messages = [...app.messages, message];
      // const channelsData = Object.values(state.server?.channels);
      const channel = state.channels[message.channel_id];
      if (state.server.id !== message.server_id || !channel)
        return { ...state };

      // if (
      //   state.server.id !== message.server_id ||
      //   !channelsData.some((ch) => ch.id === message.channel_id)
      // )
      // const channel = {
      //   ...channelsData.find((ch) => ch.id === message.channel_id),
      // };

      const messages = [...channel.messages, message];

      // const updatedChannel = { ...channel, messages };

      // -> for DMs (this puts newest DM on top (can be used for notifications))
      // const updatedChannels = [
      //   updatedChannel,
      //   ...channels.filter((ch) => ch.id !== message.channel_id),
      // ];
      const updatedChannel = { ...channel, messages };
      // state.server.channels[message.channel_id] = updatedChannel;
      // reformatChannel(channels)
      // [0:{},1:{},2:{}]
      // const channelIds = Object.keys(state.server?.channels);
      // const index = channelIds.indexOf(message.channel_id)
      return {
        ...state,
        // server: { ...state.server, channels: state.server.channels },
        // channels: state.server.channels,
        channels: {
          ...state.channels,
          [message.channel_id]: updatedChannel,
        },
        messages:
          state.channel.id === message.channel_id ? messages : state.messages,
      };
    }
    case SET_MEMBERS:
      return {
        ...state,
        server: { ...state.server, members },
        members,
      };
    case SET_NEW_CHANNEL: {
      // const channels = [...state.server.channels, channel];
      channel.messages = [];
      const channels = { ...state.channels, [channel.id]: channel };
      return {
        ...state,
        channels,
        channel,
        messages: [],
      };
    }
    case EDIT_SERVER: {
      const { id, title, logo, tags } = server;
      const servers = state.servers.map((s) => {
        if (s.id === id) {
          s.title = title;
          s.logo = logo;
        }
        return s;
      });
      return {
        ...state,
        server: { ...state.server, title, logo, tags },
        servers,
      };
    }
    default:
      return { ...state, error: `Unsupported action type: ${action.type}` };
  }
}
