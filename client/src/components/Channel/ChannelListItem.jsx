import React, { useContext } from "react";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import classNames from "classnames";

//style
import { useChannelListStyles } from "../styles/useChannelListItemStyles";
import { makeStyles } from "@mui/styles";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";
import Notification from "@mui/icons-material/NotificationsActive";
import Mention from "@mui/icons-material/PriorityHigh";
import { CHANNEL_JOIN, CHANNEL_LEAVE } from "../../utils/constants";
const useStyles = makeStyles({
  channel: {
    borderBottom: "1px solid rgb(4,11,12,0.2)",
    padding: "1em 0.8em",
    cursor: "pointer",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
      background: "rgb(182, 185, 181, 0.3)",
    },
  },
  selected: { background: "rgb(182, 185, 181, 1)", opacity: 1 },
  notification: { opacity: 1 },
  mention: { opacity: 1 },
  title: {},
  icon: { minWidth: "auto", paddingRight: "0.5em" },
});
export default function ChannelListItem(props) {
  // const classes = useChannelListStyles();
  const { app, setChannel } = useContext(ServerContext);
  const {
    state: { user, socket },
  } = useContext(AuthContext);

  const classes = useStyles();
  const { id, channel } = props;

  const channelClass = classNames(classes.channel, {
    [classes.selected]: id === app.channel.id,
    [classes.notification]: channel.notification,
    [classes.mention]: channel.mention,
  });

  const handleChannelClick = () => {
    if (app.channel.id) {
      socket.emit(CHANNEL_LEAVE, app.channel.id);
    }
    socket.emit(CHANNEL_JOIN, {
      id: channel.id,
      server_id: app.server.id,
    });
    setChannel(id);
  };

  return (
    <Box>
      <ListItem
        className={channelClass}
        // button
        // key={id}
        // disableRipple
        onClick={handleChannelClick}
      >
        <ListItemIcon className={classes.icon}>
          <TagIcon />
        </ListItemIcon>
        <ListItemText primary={channel.title} className={classes.title} />
        {channel.notification && <Notification fontSize="small" />}
        {channel.mention && <Mention fontSize="small" />}
      </ListItem>
      <Divider />
    </Box>
  );
}
