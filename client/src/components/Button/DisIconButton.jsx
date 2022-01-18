import React from "react";
import { IconButton } from "@mui/material";
import classNames from "classnames";

import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";

export default function DisIconButton(props) {
  const { home, children, ...rest } = props;

  const classes = useDisIconButtonStyles();

  const iconClass = classNames(classes.root, {
    [classes.home]: home,
  });

  return (
    <IconButton className={iconClass} {...rest}>
      {children}
    </IconButton>
  );
}
