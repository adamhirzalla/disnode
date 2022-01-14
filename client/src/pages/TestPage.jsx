import React from "react";
import ElipsesDropdown from "../components/ElipsesDropDown";
import NewChannelIcon from "../components/Channel/NewChannelIcon";
import ServerList from "../components/Server/ServerList";
import ChannelList from "../components/Channel/ChannelList";

export default function TestPage() {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <ElipsesDropdown />
      <NewChannelIcon />
      <ServerList />
      <ChannelList />
    </div>
  );
}
