import socket from "../socket/index";
import AuthContext from "../contexts/AuthContext";
import { getServers } from "../network/serverApi";
import { useContext, useEffect, useRef } from "react";
import ServerContext from "../contexts/ServerContext";
import MemberList from "../components/Member/MemberList";
import ServerList from "../components/Server/ServerList";
import ChannelList from "../components/Channel/ChannelList";
import MessageList from "../components/Channel/Message/MessageList";

export default function Test() {
  // const { app, setServer, setChannel } = useServerData();

  const sio = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const { app, setServers, setMembers, setActiveUsers } =
    useContext(ServerContext);

  useEffect(async () => {
    if (!state.loading) {
      sio.current = socket;
      console.log("socket effect");

      socket.on("connection", (activeUsers) => {
        setActiveUsers(activeUsers);
      });

      socket.on("disconnection", (activeUsers) => {
        setActiveUsers(activeUsers);
      });

      const servers = await getServers();
      setServers(servers);
    }
  }, [state.authenticated]);

  useEffect(async () => {
    const members = app.members.map((member) => {
      console.log(app.activeUsers.includes(member.user_id));
      return {
        ...member,
        is_active: app.activeUsers.includes(member.user_id),
      };
    });
    console.log("updating members", members);
    setMembers(members);
  }, [app.activeUsers]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ServerList socket={sio.current} user={state.user}>
        {app.server && (
          <ChannelList>
            <MessageList>
              <MemberList socket={sio.current} />
            </MessageList>
          </ChannelList>
        )}
      </ServerList>
    </div>
  );
}
