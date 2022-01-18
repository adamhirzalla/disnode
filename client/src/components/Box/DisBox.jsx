import React from "react";
import { Box } from "@mui/system";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: { display: "flex", width: "100%", height: "100%" },
  navBox: { display: "flex", width: "100%" },
  friendListBox: {
    width: "30em",
    display: "flex",
    flexDirection: "column",
  },
  connections: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  displayColumn: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "1.5em",
  },
  homeWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
    margin: ".8em 0em",
  },
  friendProfileWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  friendsBar: {
    backgroundColor: "inherit",
    color: "black",
    width: "100%",
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
    [classes.connections]: type === "connections",
    [classes.displayColumn]: type === "displayColumn",
    [classes.friendProfileWrapper]: type === "friendProfileWrapper",
    [classes.homeWrapper]: type === "homeWrapper",
    [classes.friendsBar]: type === "friendsBar",
  });

  return (
    <Box component={component} className={boxClass} {...rest}>
      {children}
    </Box>
  );
}
