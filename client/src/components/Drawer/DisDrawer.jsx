import React from "react";
import { Drawer } from "@mui/material";
import classNames from "classnames";

import { useDisDrawerStyles } from "../styles/useDisDrawerStyles";

export default function DisDrawer(props) {
  const { disStyle, children, ...rest } = props;
  const classes = useDisDrawerStyles();
  const drawerClass = classNames(null, {
    [classes.serverList]: disStyle === "nav",
    [classes.channelList]: disStyle === "channel",
  });
  return (
    <Drawer className={drawerClass} {...rest}>
      {children}
    </Drawer>
  );
}
