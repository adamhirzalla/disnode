import React from "react";
import { Box } from "@mui/system";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: { display: "flex", width: "100%", height: "100%" },
  navBox: { display: "flex", width: "100%" },
}));

export default function DisBox(props) {
  //props destructure
  const { type, children, ...rest } = props;

  //styles
  const classes = useStyles();

  //dynamic classname
  const boxClass = classNames(classes.root, {
    [classes.navBox]: type === "navBox",
  });

  return (
    <Box className={boxClass} {...rest}>
      {children}
    </Box>
  );
}
