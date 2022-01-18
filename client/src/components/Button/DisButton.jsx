import React from "react";
import Button from "@mui/material/Button";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import classNames from "classnames";

export default function DisButton(props) {
  const { children, type, ...rest } = props;
  const classes = useDisButtonStyles();

  const buttonClass = classNames(classes.root, {
    [classes.submit]: type === "submit",
    [classes.create]: type === "create",
    [classes.cancel]: type === "cancel",
  });

  return (
    <Button className={buttonClass} {...rest}>
      {children}
    </Button>
  );
}
