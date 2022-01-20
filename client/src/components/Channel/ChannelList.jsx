import { useContext, useState } from "react";
import { List, Drawer, CssBaseline, Divider } from "@mui/material";
import ChannelListItem from "./ChannelListItem";
import NewChannelDialog from "./NewChannelDialog";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListStyles";
import SettingServer from "./SettingServer";
import ServerMenu from "./ServerMenu";

export default function ChannelList({ children }) {
  const classes = useChannelListStyles();

  const {
    app: { channels, channel },
    setChannel,
  } = useContext(ServerContext);

  const parsedChannels = channels.map((ch) => {
    return (
      <ChannelListItem
        key={ch.id}
        id={ch.id}
        title={ch.title}
        channel={channel}
        setChannel={setChannel}
      />
    );
  });
  return (
    <>
      <CssBaseline />
      <Drawer className={classes.drawer} variant="permanent" anchor="left">
        <List className={classes.list}></List>
        <List className={classes.list}>
          <SettingServer />
          <Divider />
          {parsedChannels}
        </List>
        <NewChannelDialog />
      </Drawer>
      {children}
    </>
  );
}
