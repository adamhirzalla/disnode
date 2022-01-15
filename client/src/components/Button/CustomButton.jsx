import React from "react";
import Button from "@mui/material/Button";
import { useButtonStyles } from "../styles/useButtonStyles";

export default function CustomButton(props) {
  const classes = useButtonStyles();
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
