import { useContext, useEffect, useReducer, useRef, useState } from "react";
import ElipsesDropdown from "../components/ElipsesDropDown";
import ServerList from "../components/Server/ServerList";
import ChannelList from "../components/Channel/ChannelList";
import MessageList from "../components/Channel/Message/MessageList";
import MemberList from "../components/Member/MemberList";
import sio from "../socket/index";
import AuthContext from "../contexts/AuthContext";
import NewChannelDialog from "../components/Channel/NewChannelDialog";
import useServerData from "../hooks/useServerData";
import { ThemeProvider } from "@mui/styles";

export default function Test() {
  const { app, setServer, setChannel } = useServerData();

  const testArr = [
    { name: "jono", id: 1 },
    { name: "cyn", id: 2 },
    { name: "adam", id: 3 },
    { name: "hyunsu", id: 4 },
    { name: "jono", id: 5 },
    { name: "cyn", id: 6 },
    { name: "adam", id: 7 },
    { name: "hyunsu", id: 8 },
    { name: "jono", id: 9 },
    { name: "cyn", id: 10 },
    { name: "adam", id: 11 },
    { name: "hyunsu", id: 12 },
  ];

  const socket = useRef();
  const { state, dispatch } = useContext(AuthContext);

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
        <ChannelList channels={app.channels} setChannel={setChannel}>
          <MemberList socket={socket.current} members={app.members}>
            <MessageList messages={app.messages} />
          </MemberList>
        </ChannelList>
        {/* )} */}
      </ServerList>
    </div>
  );
}
