import { useState } from "react";
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

const mockMessages = [
  {
    id: 1,
    user_id: 3,
    name: "Hyunsu",
    img: "https://photolemur.com/uploads/blog/unnamed.jpg",
    msg: "Hello guys",
  },
  {
    id: 2,
    user_id: 1,
    name: "Adam",
    img: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    msg: "Sup",
  },
  {
    id: 3,
    user_id: 2,
    name: "Jonathan",
    img: "https://static8.depositphotos.com/1008939/939/i/600/depositphotos_9394698-stock-photo-lonely-man.jpg",
    msg: "How's it going",
  },
  {
    id: 4,
    user_id: 5,
    name: "Jono",
    img: "https://wl-brightside.cf.tsp.li/resize/728x/jpg/6f5/d79/6c2d4457e7b227254fbc0f51b8.jpg",
    msg: "wanna play?",
  },
  { id: 5, user_id: 6, name: "Lulu", img: "", msg: "I can play tomorrow" },
  {
    id: 6,
    user_id: 7,
    name: "Lala",
    img: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    msg: "I can play now invite me",
  },
  {
    id: 7,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 8,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 9,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 10,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 11,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 12,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 13,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 14,
    user_id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 15,
    user_id: 4,
    name: "Ted",
    img: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    msg: "hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha hhahahha ",
  },
];

const mockMessage = {
  id: 6,
  user_id: 7,
  name: "Lala",
  img: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
  msg: "",
};

export default function MessageList({ children, messages }) {
  const classes = useMessageListSytle();
  const [message, setMessage] = useState("");

  // TextField onChange event handler
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // TextField onKeyDown event handler
  const handleMessageKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // form onSubmit event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // update mock message
    mockMessage.msg = message;
    mockMessages.push(mockMessage);
    setMessage("");
  };

  const isOwner = (user_id) => {
    if (user_id === 4) {
      return "right";
    }
    return "left";
  };

  messages = mockMessages;
  const messageItems = messages.map((user) => {
    return (
      <MessageListItem key={user.id} user={user} side={isOwner(user.user_id)} />
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
              # Welcome
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
              onChange={handleMessageChange}
              onKeyDown={handleMessageKeyDown}
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
