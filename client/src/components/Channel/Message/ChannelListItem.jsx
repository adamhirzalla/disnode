import React from "react";
import { ListItemIcon, ListItem, ListItemText, Divider } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { useState } from "react";
import classNames from "classnames";

//style
import { useChannelListStyles } from "../../styles/useChannelListItemStyles";

export default function ChannelListItem({ id, title, channel, setChannel }) {
  const classes = useChannelListStyles();

  const listItemClass = classNames(classes.listItem, {
    [classes.selected]: id === channel,
  });

  return (
    <>
      <ListItem className={listItemClass} button key={id} onClick={setChannel}>
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
      <Divider />
    </>
  );
}
