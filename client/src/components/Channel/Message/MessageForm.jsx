import { Send } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Box, Fab, TextField } from "@mui/material";
import AuthContext from "../../../contexts/AuthContext";
import { getMessages, sendMessage } from "../../../network/messageApi";
import ServerContext from "../../../contexts/ServerContext";
import { getChannels } from "../../../network/channelApi";
import { makeStyles } from "@mui/styles";
import { CHANNEL_MESSAGE, SET_MESSAGES } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    justifyContent: "center",
    minHeight: "20%",
    width: "100%",
    // minWidth: "100%",
    borderTop: "1px solid rgb(4,11,12,0.4)",
    // backgroundColor: "rgb(173, 169, 168,0.7)",
  },
  textField: {
    // width: "80%",
    justifyContent: "center",
    flexGrow: 1,
    marginLeft: "3em",
    outline: "none",
  },
  input: {
    // width: "100%",
    backgroundColor: "rgb(16,16,16,0.2)",
    color: "black",
    border: "2px solid black",
  },
  send: {
    margin: "auto 2em",
    backgroundColor: "rgb(199, 58, 58,1)",
    opacity: "0.9",
    "&:hover": {
      backgroundColor: "rgb(199, 58, 58,1)",
      opacity: "1",
    },
  },
}));

export default function MessageForm() {
  // const classes = useMessageListStyles();
  const classes = useStyles();
  const [input, setInput] = useState("");
  const {
    setMessages,
    appDispatch,
    setServer,
    app: { channel, server, messages },
  } = useContext(ServerContext);
  const {
    state: { user, socket, activeUsers, autheticated },
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

  useEffect(() => {
    setInput("");
  }, [channel]);

  // Sending a message to a server channel
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    try {
      // We query for server channels so that our sent messages
      // that are handles on client side can persist on channel navigation
      // BETTER TO IMPLEMENT THIS IN SOCKETS THEN BROADCAST MESSAGE
      // Sender -> socket -> server -> DB -> socket -> Users
      const message = await sendMessage(channel.id, { body: input });
      // const channels = await getChannels(server.id);
      message.sender_avatar = user.avatar;
      message.sender_nickname = user.nickname;
      message.views = [];
      message.server_id = server.id;
      // setChannels(channels); // dont use
      // console.log(message);
      // console.log(activeUsers);
      socket.emit(CHANNEL_MESSAGE, message);
      setInput("");
      // setMessages(message);
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
        // color="info"
        maxRows="5"
        variant="outlined"
        placeholder={`Message #${"Disnode"}`}
        multiline
        required
        InputProps={{ className: classes.input }}
      />
      <Fab type="submit" variant="extended" className={classes.send}>
        <Send />
        Send
      </Fab>
      {/* <IconButton type="submit" aria-label="send" color="primary">
        
      </IconButton> */}
    </Box>
  );
}
