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
  CHANNEL_MESSAGE,
  HOME,
  MEMBER_KICK,
  MEMBER_UPDATE,
  SERVER_JOIN,
  SERVER_LEAVE,
} from "../utils/constants";
import { getServers } from "../network/serverApi";

const useStyles = makeStyles({
  messages: { justifyContent: "flex-end", width: "100%" },
});
export default function Server(props) {
  const classes = useStyles();
  const { setMessages, setMembers, setServers, setMode, app } =
    useContext(ServerContext);
  const { channel, server, messages, servers } = app;
  const {
    state: { user, socket, activeUsers, autheticated },
  } = useContext(AuthContext);

  useEffect(() => {
    if (socket) {
      socket.on(SERVER_JOIN, serverJoined);
      socket.on(SERVER_LEAVE, serverLeft);
      socket.on(CHANNEL_MESSAGE, receiveChannelMSG);
      socket.on(MEMBER_UPDATE, updateMembers);
      socket.on(MEMBER_KICK, kickMember);
      console.log("listeners added");
    }
    return () => {
      socket.removeAllListeners();
      console.log("listeners removed");
    };
  }, [socket, server]);
  const serverJoined = (userId, serverId) => {
    console.log(`User ${userId} has joined Server ${serverId}`);
  };
  const serverLeft = (userId, serverId) => {
    console.log(`User ${userId} just left Server ${serverId}`);
  };
  const receiveChannelMSG = (message) => {
    setMessages(message);
  };
  const updateMembers = (members) => {
    setMembers(members);
  };
  const kickMember = async (member) => {
    if (member.user_id === user.id) {
      console.log("member:", member);
      console.log(member.user_id, user.id);
      const servers = await getServers();
      if (server.id) socket.emit(SERVER_LEAVE, server.id);
      setServers(servers);
      setMode(HOME);
    }
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
