import { useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  ListItem,
  Container,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import MessageListItem from "./MessageListItem";
import MessageForm from "./MessageForm";
import { useMessageListSytle } from "../../styles/useMessageListSytle";
import ServerContext from "../../../contexts/ServerContext";

export default function MessageList({ children }) {
  const classes = useMessageListSytle();

  const {
    app: { messages, channel },
  } = useContext(ServerContext);

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
        // side={isOwner(user.user_id)}
      />
    );
  });

  return (
    <>
      <Container className={classes.root} disableGutters maxWidth="l" fixed>
        <ListItem
          className={classes.channelList}
          alignItems="center"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box className={classes.channel}>
            <Typography className={classes.typography} component="span">
              # {channel?.title}
            </Typography>
            <IconButton sx={{ mr: 1 }}>
              <AddCircle sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </ListItem>
        <Divider />

        {/* MessageList Item */}
        <Box className={classes.message}>{messageItems}</Box>
        <Divider />

        {/* Message form component */}
        <ListItem className={classes.listItem}>
          <MessageForm />
        </ListItem>
        {children}
      </Container>
    </>
  );
}
