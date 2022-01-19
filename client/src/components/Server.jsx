import { useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import ChannelList from "./Channel/ChannelList";
import MessageList from "./Channel/Message/MessageList";
import MemberList from "./Member/MemberList";

export default function Server(props) {
  const {
    app: { channel },
  } = useContext(ServerContext);
  return (
    <>
      <ChannelList>{channel && <MessageList />}</ChannelList>
      <MemberList />
    </>
  );
}
