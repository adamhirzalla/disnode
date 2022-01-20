import React, { useContext, useState } from "react";
import { Box, Paper } from "@mui/material";
import { DMTextInput } from "./DMTextInput";
import { DMMessageLeft, DMMessageRight } from "./DMMessage";
import { makeStyles } from "@mui/styles";
import DMChatTitle from "./DMChatTitle";
import AuthContext from "../../contexts/AuthContext";

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

export default function DMChat(props) {
  const classes = useStyles();
  const { messages } = props;

  const user_id = useContext(AuthContext).state.user.id;

  const messageItems = messages.map((message, i) => {
    if (message.sender_id === user_id) {
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
