import React from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";
import { useServerListItemStyles } from "../styles/useServerListItemStyles";
import { Tooltip } from "@mui/material";

export default function ServerListItem({
  id,
  server,
  title,
  image,
  setServer,
}) {
  const classes = useServerListItemStyles();
  const listItemClass = classNames(classes.default, {
    [classes.selected]: id === server,
  });

  return (
    <ListItem key={id}>
      <Tooltip title={title}>
        <IconButton
          className={listItemClass}
          // title={title}
          onClick={() => {
            setServer(id);
            // console.log(server?.title);
          }}
        >
          <img src={image} width="70px" />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}
