import React from "react";
import Button from "@mui/material/Button";
import { buttonStyles } from "../styles/buttonStyles";

export default function ContainedButton(props) {
  const classes = buttonStyles();
  const handleEvent = () => {
    if (props.name === "Submit") {
      // do something here
    }
    if (props.name === "Create") {
      // do something here
    }
    props.onClick();
  };

  return (
    <>
      <Button
        className={
          props.variant === "contained" ? classes.contained : classes.text
        }
        variant={props.variant}
        onClick={handleEvent}
      >
        {props.name}
      </Button>
    </>
  );
}
