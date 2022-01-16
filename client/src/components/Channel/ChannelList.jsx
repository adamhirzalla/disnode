import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ChannelListItem from "./Message/ChannelListItem";

//style
import { useChannelListStyles } from "../styles/useChannelListStyles";

const mockChannels = [
  {
    id: 1,
    title: "Duos",
  },
  {
    id: 2,
    title: "Trios",
  },
  {
    id: 3,
    title: "Hi",
  },
];

const parsedChannels = mockChannels.map((channel) => {
  return (
    <ChannelListItem key={channel.id} id={channel.id} title={channel.title} />
  );
});

export default function ChannelList({ children }) {
  const classes = useChannelListStyles();
  return (
    <>
      <Box className={classes.box}>
        <CssBaseline />
        <Drawer className={classes.drawer} variant="permanent" anchor="left">
          <List className={classes.list}>{parsedChannels}</List>
        </Drawer>
        <div>{children}</div>
      </Box>
    </>
  );
}
