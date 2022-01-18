import React from "react";
import { IconButton } from "@mui/material";
import classNames from "classnames";

export default function DisIconButton(props) {
  const { type, children, ...props } = props;

  const iconClass = classNames(classes.root, {
    [classes.home]: type.home,
  });

  return (
    <IconButton className={iconClass} title={type} {...props}>
      {children}
    </IconButton>
  );
}