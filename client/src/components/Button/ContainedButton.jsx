import React from "react";
import Button from "@mui/material/Button";
import { buttonUseStyles } from "../styles/buttonUseStyles";

export default function ContainedButton(props) {
  const classes = buttonUseStyles();
  const handleEvent = () => {
    if (props.name === "Submit") {
      // do something here
    }
    if (props.name === "Create") {
      // do something here
    }
  };

  return (
    <>
      <Button
        className={classes.test}
        variant="contained"
        onClick={handleEvent}
      >
        {props.name}
      </Button>
    </>
  );
}
