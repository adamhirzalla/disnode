import { makeStyles } from "@mui/styles";
import ChannelList from "./Channel/ChannelList";
import MessageList from "./Channel/Message/MessageList";
import MemberList from "./Member/MemberList";
import Stack from "@mui/material/Stack";
import MessageForm from "./Channel/Message/MessageForm";
import ChannelHeader from "./Channel/ChannelHeader";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";
import {
  CHANNEL_DELETE,
  CHANNEL_EDIT,
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  CHANNEL_MESSAGE,
  CHANNEL_NEW,
  DELETE_CHANNEL,
  DELETE_MEMBER,
  DELETE_MESSAGE,
  EDIT_CHANNEL,
  EDIT_SERVER,
  HOME,
  MEMBER_KICK,
  MEMBER_UPDATE,
  MESSAGE_DELETE,
  MESSAGE_VIEW,
  SERVERS_UPDATE,
  SERVER_EDIT,
  SERVER_JOIN,
  SERVER_LEAVE,
  SET_ACTIVE_USERS,
  SET_NEW_CHANNEL,
  UPDATE_MESSAGES,
} from "../utils/constants";
import { getServers } from "../network/serverApi";

const useStyles = makeStyles({
  messages: {
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgb(173, 169, 168,0.3)",
  },
});
export default function Server(props) {
  const classes = useStyles();
  const { setMessages, setMembers, setServers, setMode, app, appDispatch } =
    useContext(ServerContext);
  const { channel, server, messages, servers } = app;
  const {
    state: { user, socket, activeUsers, autheticated },
    dispatch,
  } = useContext(AuthContext);

  useEffect(() => {
    if (socket) {
      socket.on("connection", updateActive);

      socket.on("disconnection", updateActive);
      socket.on(SERVER_JOIN, serverJoined);
      socket.on(SERVER_LEAVE, serverLeft);
      socket.on(CHANNEL_MESSAGE, receiveChannelMSG);
      socket.on(MEMBER_UPDATE, updateMembers);
      socket.on(MEMBER_KICK, kickMember);
      socket.on(SERVER_EDIT, editServer);
      socket.on(SERVERS_UPDATE, updateServers);
      socket.on(CHANNEL_EDIT, editChannel);
      socket.on(CHANNEL_DELETE, deleteChanel);
      socket.on(CHANNEL_NEW, newChannel);
      socket.on(MESSAGE_DELETE, deleteMessage);
      socket.on(MESSAGE_VIEW, updateMessages);
      console.log("listeners added");
    }
    return () => {
      socket.removeAllListeners();
      console.log("listeners removed");
    };
  }, [socket, server]);
  const updateActive = (activeUsers) => {
    dispatch({
      type: SET_ACTIVE_USERS,
      activeUsers,
    });
  };
  const serverJoined = (userId, serverId) => {
    console.log(`User ${userId} has joined Server ${serverId}`);
  };
  const serverLeft = (userId, serverId) => {
    console.log(`User ${userId} just left Server ${serverId}`);
  };
  const receiveChannelMSG = (message) => {
    setMessages(message, user);
    console.log(message);
  };
  const updateMembers = (members) => {
    setMembers(members);
  };
  const kickMember = async (member) => {
    if (member.user_id === user.id) {
      const servers = await getServers();
      if (server.id) socket.emit(SERVER_LEAVE, server.id);
      if (channel) socket.emit(CHANNEL_LEAVE, channel.id);
      setServers(servers);
      setMode(HOME);
    } else {
      appDispatch({
        type: DELETE_MEMBER,
        member,
      });
    }
  };
  const editServer = (server) => {
    if (server.id === app.server.id) appDispatch({ type: EDIT_SERVER, server });
  };
  const updateServers = async () => {
    const servers = await getServers();
    setServers(servers);
  };
  const editChannel = (channel) => {
    appDispatch({
      type: EDIT_CHANNEL,
      channel,
    });
  };
  const deleteChanel = (channel) => {
    socket.emit(CHANNEL_LEAVE, channel.id);
    const channels = Object.values(server?.channels).filter(
      (c) => c.id !== channel.id
    );
    socket.emit(CHANNEL_JOIN, {
      id: channels[0]?.id,
      server_id: server.id,
    });
    appDispatch({
      type: DELETE_CHANNEL,
      channel,
    });
  };
  const newChannel = (channel, user) => {
    appDispatch({
      type: SET_NEW_CHANNEL,
      channel,
      user,
    });
  };
  const deleteMessage = (message) => {
    appDispatch({
      type: DELETE_MESSAGE,
      message,
    });
  };
  const updateMessages = (messages, channelId) => {
    appDispatch({
      type: UPDATE_MESSAGES,
      messages,
      channelId,
    });
  };

  return (
    <>
      <ChannelList />
      <Stack spacing={0} className={classes.messages}>
        <ChannelHeader />
        <MessageList />
        <MessageForm />
      </Stack>
      <MemberList />
    </>
  );
}
