import React from "react";

// mui imports
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// component imports

// styles
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
const Input = styled("input")({
  display: "none",
});

export default function UploadButton() {
  const classes = useDisButtonStyles();

  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button
        variant="contained"
        component="span"
        name="Upload"
        className={classes.upload}
      >
        Upload
      </Button>
    </label>
  );
}
