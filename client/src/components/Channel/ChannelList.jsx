import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ChannelListItem from "./ChannelListItem";

//style
import { useChannelListStyles } from "../styles/useChannelListStyles";
import NewChannelDialog from "./NewChannelDialog";
import ServerContext from "../../contexts/ServerContext";

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

export default function ChannelList({ children }) {
  const [open, setOpen] = useState(true);
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
        <div>{children}</div>
      </Box>
    </>
  );
}
