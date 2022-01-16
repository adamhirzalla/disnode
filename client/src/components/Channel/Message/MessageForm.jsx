import { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useMessageListSytle } from "../../styles/useMessageListSytle";

export default function MessageForm() {
  const classes = useMessageListSytle();
  const [message, setMessage] = useState("");

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
    setMessage("");
  };

  return (
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
  );
}
