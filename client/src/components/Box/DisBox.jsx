import React from "react";
import { Box } from "@mui/system";
import classNames from "classnames";

//import styles
import { useDisBoxStyles } from "../styles/useDisBoxStyles";

export default function DisBox(props) {
  //props destructure
  const { type, children, ...rest } = props;

  //styles
  const classes = useDisBoxStyles();

  //dynamic classname
  const boxClass = classNames(classes.root, {
    [classes.root]: type === "",
  });

  return <Box className={boxClass}>{children}</Box>;
}
