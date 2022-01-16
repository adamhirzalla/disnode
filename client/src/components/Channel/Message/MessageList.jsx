import { useContext, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  IconButton,
  FormControl,
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

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // const isOwner = (user_id) => {
  //   if (user_id === 4) {
  //     return "right";
  //   }
  //   return "left";
  // };

  // To do: implement send message
  const handleSendButtonClick = (e) => {
    console.log(e.target.value);
  };
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
      <Container disableGutters maxWidth="xl" fixed>
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

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl className={classes.form}>
            <ListItem>
              <TextField
                className={classes.textField}
                value={message}
                onChange={handleMessageChange}
                autoFocus
                id="name"
                type="text"
                row="2"
                placeholder="Message"
                multiline
                InputProps={{
                  className: classes.input,
                }}
              />
              <IconButton
                aria-label="send"
                color="primary"
                onClick={handleSendButtonClick}
              >
                <Send />
              </IconButton>
            </ListItem>
          </FormControl>
        </Box>
      </Container>
    </>
  );
}
