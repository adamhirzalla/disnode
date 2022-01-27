import { useEffect, useState } from "react";

// mui imports
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// component imports

// styles
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
const Input = styled("input")({
  display: "none",
});

export default function SelectButton(props) {
  const { setFile } = props;
  const classes = useDisButtonStyles();
  useEffect(() => {
    setFile(null);
  }, []);

  const handleChange = (e) => {
    const preview = document.querySelector("#image-preview");
    preview.src = URL.createObjectURL(e.target.files[0]);
    preview.onload = function () {
      URL.revokeObjectURL(preview.src); // free memory
    };
    setFile(e.target.files[0]);
  };

  return (
    <label htmlFor="contained-button-file">
      <Input
        accept="image/*"
        multiple
        type="file"
        id="contained-button-file"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        component="span"
        disableRipple
        size="small"
        name="Select File"
        sx={{
          color: "white",
          opacity: 0.8,
          "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
          backgroundColor: "rgb(199, 58, 58,0.8)",
        }}
        // startIcon={<DoNotDisturbIcon />}
      >
        Select File
      </Button>
    </label>
  );
}
