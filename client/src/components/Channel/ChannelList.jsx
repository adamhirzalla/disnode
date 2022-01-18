import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import { useContext, useState } from "react";
import ChannelListItem from "./ChannelListItem";
import NewChannelDialog from "./NewChannelDialog";
import CssBaseline from "@mui/material/CssBaseline";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListStyles";

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
      <Box className={classes.box}>
        <CssBaseline />
        <Drawer className={classes.drawer} variant="permanent" anchor="left">
          <List className={classes.list}>{parsedChannels}</List>
          <NewChannelDialog />
        </Drawer>
        <div className={classes.div}>{children}</div>
      </Box>
    </>
  );
}
