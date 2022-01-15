import React from "react";

// mui imports
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// component imports

// styles
import { useButtonStyles } from "../styles/useButtonStyles";
const Input = styled("input")({
  display: "none",
});

export default function UploadButton() {
  const classes = useButtonStyles();

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
