import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { DMTextInput } from "./DMTextInput";
import { DMMessageLeft, DMMessageRight } from "./DMMessage";
import { makeStyles } from "@mui/styles";
import DMChatTitle from "./DMChatTitle";
import AuthContext from "../../../contexts/AuthContext";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import DMChatItem from "./DMChatItem";

const useStyles = makeStyles(() => ({
  // box: {
  //   height: "100%",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  // },
  // paper: {
  //   width: "100%",
  //   height: "100%",
  //   minWidth: "100%",
  //   minHeight: "52rem",
  //   maxHeight: "52rem",
  //   display: "flex",
  //   alignItems: "center",
  //   flexDirection: "column",
  //   justifyContent: "flex-end",
  //   position: "fixed",
  //   right: "0",
  //   top: 0,
  //   // marginLeft: 1005,
  //   "& .MuiPaper-root": {
  //     padding: "1rem 1rem",
  //     zIndex: 0,
  //     // marginLeft: 1000,
  //     boxSizing: "border-box",
  //     left: 652,
  //     "&::-webkit-scrollbar": {
  //       width: "0em",
  //       borderRadius: "30px",
  //     },
  //   },
  // },
  // body: {
  //   width: "calc( 100% - 20px )",
  //   margin: 10,
  //   overflowY: "scroll",
  //   height: "calc( 100% - 80px )",
  //   "& .MuiPaper-root": {
  //     "&::-webkit-scrollbar": {
  //       display: "none",
  //       borderRadius: "30px",
  //     },
  //   },
  // },
  // chatPaper: {
  //   boxShadow: "0 0 0 0",
  // },
  messages: {
    display: "flex",
    maxHeight: "100vh",
    height: "100%",
    flexDirection: "column",
    marginTop: "auto",
    // justifyContent: "flex-end", // BUG
    paddingBottom: "0.5em",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      borderRadius: "30px",
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0.3)",
      borderRadius: "30px",
    },
  },
  message: {},
  avatar: {},
  body: {},
  action: {},
}));

export default function DMChat(props) {
  const classes = useStyles();
  const { messages } = props;

  const {
    state: { user },
  } = useContext(AuthContext);

  // const messageItems = messages.map((message, i) => {
  //   if (message.sender_id === user_id) {
  //     return (
  //       <DMMessageRight
  //         key={i}
  //         sender_nickname={message.sender_nickname}
  //         sender_avatar={message.sender_avatar}
  //         id={message.sender_id}
  //         message={message.body}
  //         sent_at={message.sent_at}
  //         // scrollRef={scrollRef}
  //         // scrollToBottom={scrollToBottom}
  //         // side={isOwner(user.user_id)}
  //       />
  //     );
  //   }
  //   return (
  //     <DMMessageLeft
  //       key={i}
  //       sender_nickname={message.sender_nickname}
  //       sender_avatar={message.sender_avatar}
  //       id={message.sender_id}
  //       message={message.body}
  //       sent_at={message.sent_at}
  //       // scrollRef={scrollRef}
  //       // scrollToBottom={scrollToBottom}
  //       // side={isOwner(user.user_id)}
  //     />
  //   );
  // });

  const messageItem = messages.map((message, i) => {
    return <DMChatItem key={i} message={message} />;
  });
  function Message(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
    // {behavior: "smooth"}
  });

  return (
    // <Box className={classes.box}>
    //   <Box className={classes.paper}>
    //     <DMChatTitle title={"DM Title"} />
    //     <Paper className={classes.body} classes={{ paper: classes.chatPaper }}>
    //       {messageItems}
    //       <DMTextInput />
    //     </Paper>
    //   </Box>
    // </Box>
    <>
      {/* <Demo> */}
      <List dense={false} className={classes.messages}>
        {messageItem}

        <div ref={scrollRef} />
      </List>
      {/* </Demo> */}
    </>
  );
}
