import React from "react";
import { Divider } from "@mui/material";
import classNames from "classnames";

//import styles
import { useDisDividerStyles } from "../components/styles/useDisDividerStyles";

export default function DisDivider(props) {
  //props destructure
  const { home, ...rest } = props;

  //styles
  const classes = useDisDividerStyles();

  //dynamic classname
  const dividerClass = classNames(classes.root, {
    [classes.serverList]: home,
  });

  return <Divider className={dividerClass} />;
}
