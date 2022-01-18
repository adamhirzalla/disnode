import React from "react";
import { IconButton } from "@mui/material";
import classNames from "classnames";

import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";

export default function DisIconButton(props) {
  const { type, children, ...rest } = props;

  const classes = useDisIconButtonStyles();

  const iconClass = classNames(classes.root, {
    [classes.home]: type === "home",
  });

  return (
    <IconButton className={iconClass} {...rest}>
      {children}
    </IconButton>
  );
}
