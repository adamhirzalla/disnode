import React from "react";
import { Drawer, IconButton, Divider, Box, List } from "@mui/material";
import NewServerDialog from "../Server/NewServerDialog";
import { useDisDrawerStyles } from "../styles/useDisDrawerStyles";
import classNames from "classnames";

const drawerClass = classNames(classes.root, {
  [classes.serverList]: props.type === serverList,
  [classes.channelList]: props.type === serverList,
});

export default function DisDrawer(props) {
  const classes = useDisDrawerStyles();
  return (
    <Drawer className={drawerClass} variant="permanent" anchor="left">
      <IconButton title="Home" onClick={() => handleHomeClick(socket)}>
        <img alt="Home" src="/images/Disnode-red.png" width="70px" />
      </IconButton>
      <Divider className={classes.divider} />
      <Box ml={"auto"} mr={"auto"}>
        <List>{parsedServers}</List>
      </Box>
      <Divider />
      <Box ml={"auto"} mr={"auto"}>
        <NewServerDialog onClick={addServer} />
      </Box>
    </Drawer>
  );
}
