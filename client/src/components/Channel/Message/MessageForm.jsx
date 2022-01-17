import { useContext, useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useMessageListSytle } from "../../styles/useMessageListSytle";
import ServerContext from "../../../contexts/ServerContext";
import { sendMessage } from "../../../network/messageApi";

export default function MessageForm() {
  const classes = useMessageListSytle();
  const [input, setInput] = useState("");
  const {
    setMessage,
    app: { channel },
  } = useContext(ServerContext);

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
      const message = await sendMessage(channel.id, { body: input });
      setMessage(message);
      setInput((prev) => "");
    } catch {
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
        placeholder="Message"
        multiline
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
