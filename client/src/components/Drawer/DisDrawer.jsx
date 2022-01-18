import React from "react";
import { Drawer } from "@mui/material";
import classNames from "classnames";

import { useDisDrawerStyles } from "../styles/useDisDrawerStyles";

export default function DisDrawer(props) {
  const { type, children, ...rest } = props;
  const classes = useDisDrawerStyles();
  const drawerClass = classNames(null, {
    [classes.serverList]: type === "nav",
    [classes.channelList]: type === "channel",
  });
  return (
    <Drawer className={drawerClass} {...rest}>
      {children}
    </Drawer>
  );
}
