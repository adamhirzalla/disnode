import ChannelList from "../Channel/ChannelList";
import MessageList from "../Channel/Message/MessageList";
import MemberList from "../Member/MemberList";

export default function Server(props) {
  return (
    <>
      <ChannelList>
        <MessageList />
      </ChannelList>
      <MemberList />
    </>
  );
}
