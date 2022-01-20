import { Send } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AuthContext from "../../../contexts/AuthContext";
import { sendMessage } from "../../../network/messageApi";
import ServerContext from "../../../contexts/ServerContext";
import { useMessageListStyles } from "../../styles/useMessageListStyles";
import { getChannels } from "../../../network/channelApi";

export default function MessageForm() {
  const classes = useMessageListStyles();
  const [input, setInput] = useState("");
  const {
    setMessages,
    setChannels,
    app: { channel, server },
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
    try {
      // We query for server channels so that our sent messages
      // that are handles on client side can persist on channel navigation
      const message = await sendMessage(channel.id, { body: input });
      const channels = await getChannels(server.id);
      message.sender_avatar = user.avatar;
      message.sender_nickname = user.nickname;
      setMessages(message);
      setChannels(channels);
      setInput((prev) => "");
    } catch (e) {
      console.log("Failed to send message");
    }
  };

  return (
    <Box component="form" className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        type="text"
        maxRows="3"
        variant="standard"
        placeholder={`Message #${channel.title}`}
        multiline
        required
        InputProps={{ className: classes.input }}
      />
      <IconButton type="submit" aria-label="send" color="primary">
        <Send />
      </IconButton>
    </Box>
  );
}
