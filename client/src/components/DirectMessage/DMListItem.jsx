import React from "react";
import {
  ListItem,
  ListItemText,
  Divider,
  Box,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

//style
const useStyles = makeStyles(() => ({
  divider: {
    marginTop: ".6em",
    width: "60%",
  },
  listItem: {
    "&:hover": {},
    padding: "1.2em 1em",
  },
  selected: {
    background: "rgb(182, 185, 181, 0.5)",
  },
  text: {
    color: "#FFF",
  },
}));

export default function DMListItem(props) {
  const classes = useStyles();
  const { user, id, DMchannel, setDMChannel } = props;
  // const listItemClass = classNames(classes.listItem, {
  //   [classes.selected]: id === channel.id,
  // });

  // const handleChannelClick = () => {
  //   setDMChannel(id);
  // };

  return (
    <Box>
      <ListItem
        className={classes.listItem}
        button
        key={user.id}
        // onClick={handleChannelClick}
        disablePadding
      >
        <ListItemAvatar>
          <Avatar alt={user.full_name} src={user.img} />
        </ListItemAvatar>
        <ListItemText primary={user.full_name} className={classes.text} />
      </ListItem>
      <Divider />
    </Box>
  );
}
