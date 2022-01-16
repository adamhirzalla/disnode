import { useContext, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  IconButton,
  ListItem,
  Container,
} from "@mui/material";
import { AddCircle, Send } from "@mui/icons-material";
import MessageListItem from "./MessageListItem";
import { useMessageListSytle } from "../../styles/useMessageListSytle";
import ServerContext from "../../../contexts/ServerContext";

export default function MessageList({ children }) {
  const classes = useMessageListSytle();
  const [message, setMessage] = useState("");

  const {
    app: { messages, channel },
  } = useContext(ServerContext);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // TextField onKeyDown event handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // form onSubmit event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // // update mock message
    // mockMessage.msg = message;
    // mockMessages.push(mockMessage);
    setMessage("");
  };

  // const isOwner = (user_id) => {
  //   if (user_id === 4) {
  //     return "right";
  //   }
  //   return "left";
  // };

  const messageItems = messages.map((message) => {
    return (
      <MessageListItem
        key={message.id}
        sender={{
          name: message.sender_nickname,
          avatar: message.sender_avatar,
          id: message.sender_id,
        }}
        body={message.body}
        sent_at={message.sent_at}
        // onClick={handleSendButtonClick}
        // msg={user.msg}
        // side={isOwner(user.user_id)}
      />
    );
  });

  return (
    <>
      <Container disableGutters maxWidth="l" fixed sx={{ width: "100%" }}>
        <ListItem
          alignItems="center"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box className={classes.channel}>
            <Typography
              className={classes.typography}
              component="span"
              sx={{ width: "auto", pl: 2, pt: 1 }}
            >
              # {channel?.title}
            </Typography>
            <IconButton sx={{ mr: 1 }}>
              <AddCircle sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </ListItem>
        <Divider />

        <Box className={classes.message}>{messageItems}</Box>
        <Divider />

        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              type="text"
              maxRows="3"
              variant="standard"
              placeholder="Message"
              multiline
              InputProps={{
                className: classes.input,
              }}
            />
            <IconButton type="submit" aria-label="send" color="primary">
              <Send />
            </IconButton>
          </form>
        </ListItem>
        {children}
      </Container>
    </>
  );
}
