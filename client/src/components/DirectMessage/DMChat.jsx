import React from "react";
import { Box, Paper } from "@mui/material";
import { DMTextInput } from "./DMTextInput";
import { DMMessageLeft, DMMessageRight } from "./DMMessage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  paper: {
    width: "100%",
    height: "100%",
    minWidth: "75.625rem",
    minHeight: "57rem",
    maxHeight: "57rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    "& .MuiPaper-root": {
      marginLeft: 1000,
      boxSizing: "border-box",
      left: "122px",
      "&::-webkit-scrollbar": {
        width: "0em",
        borderRadius: "30px",
      },
      "&::-webkit-scrollbar-track": {
        WebkitBoxShadow: "inset 0 0 6px rgb(0,0,0,0)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(0,0,0,0)",
        // outline: "1px solid black",
        borderRadius: "30px",
      },
    },
  },
  body: {
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )",
    "& .MuiPaper-root": {
      "&::-webkit-scrollbar": {
        display: "none",
        borderRadius: "30px",
      },
    },
  },
  chatPaper: {
    boxShadow: "0 0 0 0",
  },
}));

const messages = [
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "",
    sender_id: 1,
    body: "hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi ",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "",
    sender_id: 2,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "",
    sender_id: 3,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "",
    sender_id: 1,
    body: "hi whats up 99! ",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "",
    sender_id: 2,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "",
    sender_id: 3,
    body: "hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! ",
    sent_at: "now",
  },
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "",
    sender_id: 1,
    body: "hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99!",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "",
    sender_id: 2,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "",
    sender_id: 3,
    body: "hi whats up 88!",
    sent_at: "now",
  },
];

export default function DMChat(props) {
  const classes = useStyles();

  const messageItems = messages.map((message) => {
    if (message.sender_id === 1) {
      return (
        <DMMessageRight
          key={message.id}
          displayName={message.sender_nickname}
          photoURL={message.sender_avatar}
          id={message.sender_id}
          avatarDisp={true}
          message={message.body}
          timestamp={message.sent_at}
          // scrollRef={scrollRef}
          // scrollToBottom={scrollToBottom}
          // side={isOwner(user.user_id)}
        />
      );
    }
    return (
      <DMMessageLeft
        key={message.id}
        displayName={message.sender_nickname}
        photoURL={message.sender_avatar}
        id={message.sender_id}
        avatarDisp={true}
        message={message.body}
        timestamp={message.sent_at}
        // scrollRef={scrollRef}
        // scrollToBottom={scrollToBottom}
        // side={isOwner(user.user_id)}
      />
    );
  });

  return (
    <Box className={classes.box}>
      <Paper className={classes.paper}>
        <Paper className={classes.body} classes={{ paper: classes.chatPaper }}>
          {messageItems}
        </Paper>
        <DMTextInput />
      </Paper>
    </Box>
  );
}
