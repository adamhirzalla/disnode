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

const useStyles = makeStyles({
  messages: { justifyContent: "flex-end", width: "100%" },
});
export default function Server(props) {
  const classes = useStyles();
  const { setMessages, appDispatch, setServer, app } =
    useContext(ServerContext);
  const { channel, server, messages, servers } = app;
  const {
    state: { user, socket, activeUsers, autheticated },
  } = useContext(AuthContext);

  // useeffect responsbile for all server actions

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
