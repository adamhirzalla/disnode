import React from "react";
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
const useStyles = makeStyles({
  channel: { borderBottom: "1px solid rgb(4,11,12,0.2)", padding: "1em 0.8em" },
  selected: { background: "rgb(182, 185, 181, 0.5)" },
  title: {},
  icon: { minWidth: "auto", paddingRight: "0.5em" },
});
export default function ChannelListItem(props) {
  // const classes = useChannelListStyles();
  const classes = useStyles();
  const { id, title, channel, setChannel } = props;

  const channelClass = classNames(classes.channel, {
    [classes.selected]: id === channel.id,
  });

  const handleChannelClick = () => {
    setChannel(id);
  };

  return (
    <Box>
      <ListItem
        className={channelClass}
        button
        key={id}
        onClick={handleChannelClick}
      >
        <ListItemIcon className={classes.icon}>
          <TagIcon />
        </ListItemIcon>
        <ListItemText primary={title} className={classes.title} />
      </ListItem>
      <Divider />
    </Box>
  );
}
