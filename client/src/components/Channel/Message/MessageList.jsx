import MessageListItem from "./MessageListItem";
import { useContext, useState, useRef, useEffect, createRef } from "react";
import ServerContext from "../../../contexts/ServerContext";
import { List } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  messages: {
    display: "flex",
    maxHeight: "100vh",
    flexDirection: "column",
    marginTop: "auto",
    // justifyContent: "flex-end", BUG
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
}));

export default function MessageList({ children }) {
  // const classes = useMessageListStyles();
  const classes = useStyles();
  const {
    app: { messages, channel },
    setMessages,
  } = useContext(ServerContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
    // {behavior: "smooth"}
  });

  const parsedMessages = messages.map((message, i) => {
    return <MessageListItem key={i} message={message} />;
  });

  return (
    <List className={classes.messages}>
      {parsedMessages}
      <div ref={scrollRef} />
    </List>
  );
}

// // navigate to the latest message
// const scrollToBottom = () => {
//   scrollRef.current.scrollIntoView();
// };

// // scroll handler - show button
// const onScrollHandler = (e) => {
//   const scrollLocation = e.target.scrollTop;
//   if (scrollLocation < 1500 && e.target.scrollHeight > 800) {
//     return setScroll(true);
//   }
//   return setScroll(false);
// };

// // click handler - navigate to bottom
// const navigateToBottom = () => {
//   scrollToBottom();
//   setScroll(false);
// };
// // trigger scroll event handler when scroll is on the top
// const scrollEventHandler = (e) => {
//   if (!e.target.scrollTop) {
//     setMessages();
//   }
// };

// const isOwner = (user_id) => {
//   if (user_id === 4) {
//     return "right";
//   }
//   return "left";
// };
// const messageItems = messages.map((message) => {
//   return (
//     <MessageListItem
//       key={message.id}
//       sender={{
//         name: message.sender_nickname,
//         avatar: message.sender_avatar,
//         id: message.sender_id,
//       }}
//       body={message.body}
//       sent_at={message.sent_at}
//       scrollRef={scrollRef}
//       scrollToBottom={scrollToBottom}
//       // side={isOwner(user.user_id)}
//     />
//   );
// });

// <Container className={classes.root} disableGutters maxWidth="l" fixed>
//   <ListItem
//     className={classes.channelList}
//     alignItems="center"
//     sx={{ display: "flex", justifyContent: "center" }}
//   >
//     <Box style={{ width: "100%" }} className={classes.channel}>
//       <Typography className={classes.typography} component="span">
//         # {channel?.title}
//       </Typography>
//       <IconButton sx={{ mr: 1 }}>
//         <AddCircle sx={{ color: "black" }} />
//       </IconButton>
//     </Box>
//   </ListItem>
//   <Divider />

//   {/* MessageList Item */}
//   <Box
//     onScroll={onScrollHandler}
//     /*onScroll={scrollEventHandler}*/ className={classes.message}
//   >
//     {scroll && (
//       <IconButton onClick={navigateToBottom} className={classes.scrollIcon}>
//         <ArrowDownIcon fontSize="large" />
//       </IconButton>
//     )}
//     {messageItems}
//   </Box>
//   <Divider />

//   {/* Message form component */}
//   <ListItem className={classes.listItem}>
//     <MessageForm />
//   </ListItem>
//   {children}
// </Container>
