import React from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";
import { useServerListItemStyles } from "../styles/useServerListItemStyles";
import { Avatar, Tooltip } from "@mui/material";
import { getServer } from "../../network/serverApi";

export default function ServerListItem(props) {
  const classes = useServerListItemStyles();
  const { id, server, title, logo, setServer } = props;

  const listItemClass = classNames(classes.default, {
    [classes.selected]: id === server.id,
  });

  const handleServerClick = async () => {
    const server = await getServer(id);
    setServer(server);
  };

  return (
    <ListItem key={id}>
      <Tooltip title={title}>
        <IconButton className={listItemClass} onClick={handleServerClick}>
          <Avatar
            style={{
              width: "70px",
              height: "70px",
            }}
            src={logo}
          />
          {/* <img src={logo} width="70px" /> */}
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}
