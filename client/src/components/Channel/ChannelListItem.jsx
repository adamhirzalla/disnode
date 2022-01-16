import React from "react";
import { ListItemIcon, ListItem, ListItemText, Divider } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { useState } from "react";
import classNames from "classnames";

//style
import { useChannelListStyles } from "../styles/useChannelListItemStyles";

export default function ChannelListItem(props) {
  const classes = useChannelListStyles();
  const { id, title, channel, setChannel } = props;

  const listItemClass = classNames(classes.listItem, {
    [classes.selected]: id === channel.id,
  });

  const handleChannelClick = () => {
    setChannel(id);
  };

  return (
    <>
      <ListItem
        className={listItemClass}
        button
        key={id}
        onClick={handleChannelClick}
      >
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
      <Divider />
    </>
  );
}
