import { useContext } from "react";
import { List, ListItem, Box, Grid } from "@mui/material";
import ChannelListItem from "./ChannelListItem";
import NewChannelDialog from "./NewChannelDialog";
import ServerContext from "../../contexts/ServerContext";
import ServerMenu from "./ServerMenu";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  channels: {
    borderRight: "1px solid rgb(4,11,12,0.5)",
    minWidth: "20em",
    // width: "30%",
    // maxWidth: "20em",
  },
  add: {
    justifyContent: "center",
  },
});

export default function ChannelList() {
  const classes = useStyles();

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
    <Box className={classes.channels}>
      {/* // <Grid className={classes.channels} xs={2.5}> */}
      <List>
        <ServerMenu />

        {channels && parsedChannels}
        <ListItem className={classes.add}>
          <NewChannelDialog />
        </ListItem>
      </List>
      {/* </Grid> */}
    </Box>
  );
}
