import React from "react";
import { Box } from "@mui/system";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: { display: "flex", width: "100%", height: "100%" },
  navBox: { display: "flex", width: "100%" },
  friendListBox: {
    width: "26em",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function DisBox(props) {
  //props destructure
  const { type, children, component, ...rest } = props;

  //styles
  const classes = useStyles();

  //dynamic classname
  const boxClass = classNames(classes.root, {
    [classes.navBox]: type === "navBox",
    [classes.friendListBox]: type === "friendListBox",
  });

  return (
    <Box component={component} className={boxClass} {...rest}>
      {children}
    </Box>
  );
}
