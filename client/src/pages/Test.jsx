import { useContext, useEffect, useRef } from "react";
import ServerList from "../components/Server/ServerList";
import ChannelList from "../components/Channel/ChannelList";
import MessageList from "../components/Channel/Message/MessageList";
import MemberList from "../components/Member/MemberList";
import sio from "../socket/index";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";

export default function Test() {
  // const { app, setServer, setChannel } = useServerData();

  const socket = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const { app, setServer, setChannel } = useContext(ServerContext);

  useEffect(() => {
    socket.current = sio;
  }, [socket.current]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {/* <ElipsesDropdown /> */}
      {/* <NewChannelIcon /> */}
      {/* <NewChannelDialog /> */}
      <ServerList
        servers={app.servers}
        socket={socket.current}
        user={state.user}
        setServer={setServer}
      >
        {/* {app.server && ( */}
        <ChannelList>
          <MessageList>
            <MemberList socket={socket.current} />
          </MessageList>
        </ChannelList>
        {/* )} */}
      </ServerList>
    </div>
  );
}
