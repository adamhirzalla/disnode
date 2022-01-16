import React from "react";
import { ListItemIcon, ListItem, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";

export default function ChannelListItem() {
  return (
    <ListItem button key="Welcome">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Welcome" />
    </ListItem>
  );
}
