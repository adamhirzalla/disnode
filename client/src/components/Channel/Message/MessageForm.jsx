import { Send } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AuthContext from "../../../contexts/AuthContext";
import { sendMessage } from "../../../network/messageApi";
import ServerContext from "../../../contexts/ServerContext";
import { useMessageListSytle } from "../../styles/useMessageListSytle";

export default function MessageForm() {
  const classes = useMessageListSytle();
  const [input, setInput] = useState("");
  const {
    setMessages,
    app: { channel },
  } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // TextField onKeyDown event handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // form onSubmit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      try {
        const message = await sendMessage(channel.id, { body: input });
        message.sender_avatar = user.avatar;
        message.sender_nickname = user.display_name;
        setMessages(message);
        setInput((prev) => "");
      } catch (e) {
        console.log("Failed to send message");
      }
    }
  };

  return (
    <Box component="form" className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        // autoFocus
        type="text"
        maxRows="3"
        variant="standard"
        placeholder="Message"
        multiline
        required
        InputProps={{
          className: classes.input,
        }}
      />
      <IconButton type="submit" aria-label="send" color="primary">
        <Send />
      </IconButton>
    </Box>
  );
}
