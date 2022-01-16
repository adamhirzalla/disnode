import * as React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const mockMessages = [
  {
    id: 3,
    name: "Hyunsu",
    img: "https://photolemur.com/uploads/blog/unnamed.jpg",
    msg: "Hello guys",
  },
  {
    id: 1,
    name: "Adam",
    img: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    msg: "Sup",
  },
  {
    id: 2,
    name: "Jonathan",
    img: "https://static8.depositphotos.com/1008939/939/i/600/depositphotos_9394698-stock-photo-lonely-man.jpg",
    msg: "How's it going",
  },
  {
    id: 5,
    name: "Jono",
    img: "https://wl-brightside.cf.tsp.li/resize/728x/jpg/6f5/d79/6c2d4457e7b227254fbc0f51b8.jpg",
    msg: "wanna play?",
  },
  { id: 6, name: "Lulu", img: "", msg: "I can play tomorrow" },
  {
    id: 7,
    name: "Lala",
    img: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    msg: "I can play now invite me",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
  {
    id: 4,
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    msg: "hahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
];

export default function MessageListItem() {
  const parsedMessage = mockMessages.map((user, i) => {
    return (
      <Box
        key={i}
        sx={{ display: "flex", width: "70%", height: "auto", mt: 2 }}
      >
        <Box
          sx={{
            width: "10%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            mr: 1,
          }}
        >
          <Avatar
            alt={user.name}
            src={user.img}
            sx={{ width: 40, height: 40, ml: 1 }}
          />
          <Typography>{user.name}</Typography>
        </Box>
        <Box sx={{ ml: 5 }}>
          <Typography
            variant="body1"
            display="block"
            sx={{
              height: "auto",
              wordBreak: "break-word",
              p: 1,
              borderRadius: 5,
              color: "white",
              bgcolor: "black",
            }}
          >
            {user.msg}
          </Typography>
        </Box>
      </Box>
    );
  });

  return <>{parsedMessage}</>;
}
