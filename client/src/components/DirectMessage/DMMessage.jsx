import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Avatar, Box, Typography } from "@mui/material";

const useStyles = makeStyles(() =>
  createStyles({
    messageRow: {
      display: "flex",
      // minHeight: "800px",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    otherMessage: {
      position: "relative",
      marginLeft: "30px",
      marginBottom: "30px",
      padding: "20px",
      color: "#FFF",
      backgroundColor: "#A96767",

      maxWidth: "40rem",
      textAlign: "left",
      border: "1px solid #A96767",
      marginBottom: "30px",
      padding: "20px",
      color: "#FFF",
      minHeight: "2em",
      //height: "50px",

      borderRadius: ".4em",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #A96767",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #A96767",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px",
      },
    },
    userMessage: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "30px",
      padding: "20px",
      color: "#FFF",
      backgroundColor: "#798b94",
      maxWidth: "35em",
      minWidth: "2em",
      minHeight: "20px",
      textAlign: "left",
      border: "1px solid #798b94",
      borderRadius: ".4em",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #798b94",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #798b94",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px",
      },
    },
    messageContent: {
      padding: 0,
      margin: 0,
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".9em",
      fontWeight: "300",
      marginTop: "15px",
      bottom: "0px",
      right: "5px",
    },

    displayName: {
      marginLeft: "20px",
    },
  })
);

// others
export const DMMessageLeft = (props) => {
  const message = props.message ? props.message : "No Message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "";
  const displayName = props.displayName ? props.displayName : "Hidden";
  const classes = useStyles();
  return (
    <>
      <Box className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.blue}
          src={photoURL}
        ></Avatar>
        <Box sx={{ width: "60%" }}>
          <Box className={classes.displayName}>{displayName}</Box>
          <Box className={classes.otherMessage}>
            <Box>
              <Typography className={classes.messageContent}>
                {message}
              </Typography>
            </Box>
            <Box className={classes.messageTimeStampRight}>{timestamp}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

// user
export const DMMessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <Box className={classes.messageRowRight}>
      <Box className={classes.userMessage}>
        <Typography className={classes.messageContent}>{message}</Typography>
        <Box className={classes.messageTimeStampRight}>{timestamp}</Box>
      </Box>
    </Box>
  );
};
