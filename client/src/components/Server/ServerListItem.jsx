import React from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

export default function ServerListItem({ id, server, setServer }) {
  return (
    <ListItem>
      <IconButton
        title="Add"
        onClick={() => {
          setServer(id);
          // console.log(server?.title);
        }}
      >
        <img src={server.image} width="70px" />
      </IconButton>
    </ListItem>
  );
}
