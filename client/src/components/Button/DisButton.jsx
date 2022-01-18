import React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

//import styles
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

export default function DisButton(props) {
  //props destructure
  const { children, type, ...rest } = props;

  //styles
  const classes = useDisButtonStyles();

  //dynamic classname
  const buttonClass = classNames(classes.root, {
    [classes.submit]: type === "submit",
    [classes.submit]: type === "create",
    [classes.cancel]: type === "cancel",
  });

  return (
    <Button className={buttonClass} {...rest}>
      {children}
    </Button>
  );
}
