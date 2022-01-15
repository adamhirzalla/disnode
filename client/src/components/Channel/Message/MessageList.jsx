import * as React from "react";
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

export default function MessageList({ children }) {
  const classes = useMessageListSytle();
  const [message, setMessage] = React.useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // To do: implement send message
  const handleSendButtonClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Container disableGutters maxWidth="m" fixed>
        <ListItem
          alignItems="center"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box className={classes.channel}>
            <Typography component="span" sx={{ width: "auto", pl: 2, pt: 1 }}>
              Channel Name : Valolant
            </Typography>
            <IconButton sx={{ mr: 1 }}>
              <AddCircle sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </ListItem>
        <Divider />

        <Box className={classes.message}>
          <MessageListItem onClick={handleSendButtonClick} />
        </Box>
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
      {children}
    </>
  );
}
