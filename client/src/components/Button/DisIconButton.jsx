import classNames from "classnames";
import { IconButton } from "@mui/material";

import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";

export default function DisIconButton(props) {
  const { type, children, ...rest } = props;

  const classes = useDisIconButtonStyles();

  const iconClass = classNames(classes.root, {
    [classes.home]: type === "home",
    [classes.connections]: type === "connections",
  });

  return (
    <IconButton className={iconClass} {...rest}>
      {children}
    </IconButton>
  );
}
