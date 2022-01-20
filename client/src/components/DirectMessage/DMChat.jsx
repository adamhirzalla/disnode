import React from "react";
import { Box, Paper } from "@mui/material";
import { DMTextInput } from "./DMTextInput";
import { DMMessageLeft, DMMessageRight } from "./DMMessage";
import { makeStyles } from "@mui/styles";
import DMChatTitle from "./DMChatTitle";

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
    minHeight: "52rem",
    maxHeight: "52rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: 1005,
    "& .MuiPaper-root": {
      padding: "1rem 1rem",
      zIndex: 0,
      // marginLeft: 1000,
      boxSizing: "border-box",
      left: 652,
      "&::-webkit-scrollbar": {
        width: "0em",
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
    sender_avatar: "/images/avatar2.jpg",
    sender_id: 2,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "/images/avatar3.jpg",
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
    sender_avatar: "/images/avatar2.jpg",
    sender_id: 2,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "/images/avatar3.jpg",
    sender_id: 3,
    body: "hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! ",
    sent_at: "now",
  },
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "/images/avatar",
    sender_id: 1,
    body: "hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99!",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "/images/avatar2.jpg",
    sender_id: 2,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "/images/avatar3.jpg",
    sender_id: 3,
    body: "hi whats up 88!",
    sent_at: "now",
  },
];

export default function DMChat(props) {
  const classes = useStyles();

  const messageItems = messages.map((message, i) => {
    if (message.sender_id === 1) {
      return (
        <DMMessageRight
          key={i}
          sender_nickname={message.sender_nickname}
          sender_avatar={message.sender_avatar}
          id={message.sender_id}
          message={message.body}
          sent_at={message.sent_at}
          // scrollRef={scrollRef}
          // scrollToBottom={scrollToBottom}
          // side={isOwner(user.user_id)}
        />
      );
    }
    return (
      <DMMessageLeft
        key={i}
        sender_nickname={message.sender_nickname}
        sender_avatar={message.sender_avatar}
        id={message.sender_id}
        message={message.body}
        sent_at={message.sent_at}
        // scrollRef={scrollRef}
        // scrollToBottom={scrollToBottom}
        // side={isOwner(user.user_id)}
      />
    );
  });

  return (
    <Box className={classes.box}>
      <Box className={classes.paper}>
        <DMChatTitle title={"DM Title"} />
        <Paper className={classes.body} classes={{ paper: classes.chatPaper }}>
          {messageItems}
          <DMTextInput />
        </Paper>
      </Box>
    </Box>
  );
}
