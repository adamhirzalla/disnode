import React from "react";
import Button from "@mui/material/Button";

export default function TextButton(props) {
  return (
    <>
      <Button variant="text">{props.name}</Button>
    </>
  );
}
