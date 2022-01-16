import { useRef, useEffect } from "react";
import { Box, Avatar, Typography, Grid, List } from "@mui/material";
import { useMessageListSytle } from "../../styles/useMessageListSytle";

export default function MessageListItem({ user }) {
  const classes = useMessageListSytle();

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [user]);

  return (
    <Grid container alignItems="center" sx={{ height: 400 }}>
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
        <List ref={scrollRef} sx={{ maxWidth: 700 }}>
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
}
