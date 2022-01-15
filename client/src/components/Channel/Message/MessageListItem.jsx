import * as React from "react";
import { Box, Avatar, Typography, Grid, List } from "@mui/material";
import { useMessageListSytle } from "../../styles/useMessageListSytle";

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
    msg: "hahahhahaahahhahahhahahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhhahhahahhahahhahahhahahhahahhahahhahahhahahhahahhahahhahahhahahhahahhahaahahhahahhahaahahhahahhahaahahhahahhahaahah",
  },
];

export default function MessageListItem({ onClick }) {
  const classes = useMessageListSytle();

  return mockMessages.map((user, i) => {
    return (
      <Grid key={i} container alignItems="center" sx={{ height: 400 }}>
        <Grid xs={1.2} item sx={{ height: "80%" }}>
          <Box className={classes.avatar}>
            <Avatar
              alt={user.name}
              src={user.img}
              sx={{ width: 40, height: 40, mt: 1 }}
            />
            <Typography>{user.name}</Typography>
          </Box>
        </Grid>
        <Grid xs={"auto"} item>
          <List id="chat-windows-messages" sx={{ maxWidth: 700 }}>
            <Typography
              className={classes.messages}
              variant="body1"
              display="block"
            >
              {user.msg}
            </Typography>
          </List>
        </Grid>
      </Grid>
    );
  });
}
