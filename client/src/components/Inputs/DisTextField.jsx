import classNames from "classnames";
import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

//styles
const useStyles = makeStyles(() => ({
  root: {},
}));

export default function DisTextField(props) {
  const classes = useStyles();

  //props destructure
  const { disStyle, ...rest } = props;

  //dynamic styling
  const textFieldClass = classNames(classes.root, {});

  return (
    <TextField
      margin="normal"
      // className={textFieldClass}
      {...rest}
    />
  );
}
