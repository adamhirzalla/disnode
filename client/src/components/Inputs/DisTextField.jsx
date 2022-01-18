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
  const { variant, placeholder, type, onChange, ...rest } = props;

  //dynamic styling
  const textFieldClass = classNames(classes.root, {});

  return (
    <TextField
      margin="normal"
      type={type}
      variant={variant}
      placeholder={placeholder}
      InputProps={{
        className: { textFieldClass },
      }}
      onChange={onChange}
      {...rest}
    />
  );
}
