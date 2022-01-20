import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: { display: "flex", justifyContent: "flex-end" },
  appBar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "62.2%",
    backgroundColor: "black",
    height: "5em",
    borderRadius: "5px 5px 5px 5px",
  },
}));

export default function DMChatTitle(props) {
  const classes = useStyles();
  const { title } = props;
  return (
    <Box className={classes.box}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
