import React from "react";
import { Drawer, IconButton, Divider, Box, List } from "@mui/material";
import NewServerDialog from "../Server/NewServerDialog";
import { useDisDrawerStyles } from "../styles/useDisDrawerStyles";
import classNames from "classnames";

export default function DisDrawer(props) {
  const { nav, channel, children, ...rest } = props;
  const classes = useDisDrawerStyles();
  const drawerClass = classNames(null, {
    [classes.serverList]: nav,
    [classes.channelList]: channel,
  });
  return (
    <Drawer className={drawerClass} {...rest}>
      {children}
    </Drawer>
  );
}
