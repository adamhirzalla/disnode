import { useContext, useEffect, useRef, useState } from "react";
import ElipsesDropdown from "../components/ElipsesDropDown";
import ServerList from "../components/Server/ServerList";
import ChannelList from "../components/Channel/ChannelList";
import MemberSideBar from "../components/Member/MemberSideBar";
import sio from "../socket/index";
import AuthContext from "../contexts/AuthContext";
import NewChannelDialog from "../components/Channel/NewChannelDialog";

export default function Test() {
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
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <ElipsesDropdown />
      <NewChannelDialog />
      <ServerList socket={socket.current} user={state.user} />
      <ChannelList />
      <MemberSideBar socket={socket.current} />
    </div>
  );
}
