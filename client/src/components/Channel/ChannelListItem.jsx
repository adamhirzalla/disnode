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
const useStyles = makeStyles({
  channel: {
    borderBottom: "1px solid rgb(4,11,12,0.2)",
    padding: "1em 0.8em",
    cursor: "pointer",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  selected: { background: "rgb(182, 185, 181, 1)", opacity: 1 },
  title: {},
  icon: { minWidth: "auto", paddingRight: "0.5em" },
});
export default function ChannelListItem(props) {
  // const classes = useChannelListStyles();
  const { app, setChannel } = useContext(ServerContext);

  const classes = useStyles();
  const { id, channel } = props;

  const channelClass = classNames(classes.channel, {
    [classes.selected]: id === app.channel.id,
  });

  const handleChannelClick = () => {
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
      </ListItem>
      <Divider />
    </Box>
  );
}
