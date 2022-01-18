import React from "react";
import { Divider } from "@mui/material";

//import styles
import { useDisDividerStyles } from "../components/styles/useDisDividerStyles";

export default function DisDivider(props) {
  //props destructure
  const { type, ...rest } = props;

  //styles
  const classes = useDisDividerStyles();

  //dynamic classname
  const dividerClass = classNames(classes.root, {
    [classes.serverList]: type.serverList,
  });

  return <Divider className={dividerClass} />;
}