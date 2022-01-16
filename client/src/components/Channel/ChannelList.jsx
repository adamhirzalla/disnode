import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ChannelListItem from "./ChannelListItem";

//style
import { useChannelListStyles } from "../styles/useChannelListStyles";
import NewChannelDialog from "./NewChannelDialog";

const mockChannels = [
  {
    id: 1,
    title: "Welcome",
  },
  {
    id: 2,
    title: "Duos",
  },
  {
    id: 3,
    title: "Trios",
  },
  {
    id: 4,
    title: "LFG",
  },
];

const parsedChannels = mockChannels.map((channel) => {
  return (
    <ChannelListItem
      key={channel.id}
      id={channel.id}
      channel={1}
      title={channel.title}
    />
  );
});

export default function ChannelList({ children, channels, setChannel }) {
  const [open, setOpen] = useState(true);
  const classes = useChannelListStyles();
  return (
    <>
      <Box className={classes.box}>
        <CssBaseline />
        <Drawer className={classes.drawer} variant="permanent" anchor="left">
          <List className={classes.list}>{parsedChannels}</List>
          <NewChannelDialog />
        </Drawer>
        <div>{children}</div>
      </Box>
    </>
  );
}
