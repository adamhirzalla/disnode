import React from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";

// styles
import { useServerListItemStyles } from "../styles/useServerListItemStyles";

export default function ServerListItem({ currentServer, id, title, image }) {
  const classes = useServerListItemStyles();
  const listItemClass = classNames(classes.default, {
    [classes.selected]: id === currentServer,
  });
  return (
    <ListItem className={listItemClass} key={id}>
      <IconButton
        title="Add"
        onClick={() => {
          console.log(title);
        }}
      >
        <img src={image} width="70px" />
      </IconButton>
    </ListItem>
  );
}
