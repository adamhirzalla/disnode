import React from "react";
import { ListItemIcon, ListItem, ListItemText, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

//style
import { useChannelListStyles } from "../../styles/useChannelListItemStyles";

export default function ChannelListItem({ id, title }) {
  const classes = useChannelListStyles();
  return (
    <>
      <ListItem className={classes.listItem} button key={id}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
      <Divider />
    </>
  );
}
