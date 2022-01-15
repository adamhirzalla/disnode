import React from "react";

// mui imports
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// component imports

// styles
import { buttonUseStyles } from "../styles/buttonUseStyles";
const Input = styled("input")({
  display: "none",
});

export default function UploadButton() {
  const classes = buttonUseStyles();

  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button
        variant="contained"
        component="span"
        name="Upload"
        className={classes.contained}
      >
        Upload
      </Button>
    </label>
  );
}
