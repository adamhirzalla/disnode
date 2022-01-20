import React from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    width: "65%",
    position: "fixed",
    bottom: 40,
    right: 20,
    "& .MuiBox-root": {},
    "&:hover": {
      // borderColor: "black",
    },
  },
  button: {
    opacity: "0.8",
    fontSize: "5em",
    "&:hover": {
      backgroundColor: "inherit",
      opacity: "1",
    },
  },
}));

export const DMTextInput = () => {
  const classes = useStyles();
  return (
    <>
      <Box
        component="form"
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <TextField autoFocus label="Message" sx={{ width: "100%" }} />
        <IconButton variant="contained" className={classes.button}>
          <SendIcon sx={{ fontSize: ".5em" }} />
        </IconButton>
      </Box>
    </>
  );
};
