import React from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

export default function ServerListItem({ server }) {
  return (
    <ListItem>
      <IconButton
        title="Add"
        onClick={() => {
          console.log(server?.title);
        }}
      >
        <img src={server.image} width="70px" />
      </IconButton>
    </ListItem>
  );
}
