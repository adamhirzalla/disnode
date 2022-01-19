import moment from "moment";
import { useEffect } from "react";
import { Box, Avatar, Typography, Grid, List } from "@mui/material";
import { useMessageListItemStyles } from "../../styles/useMessageListItemStyles";

export default function MessageListItem(props) {
  const classes = useMessageListItemStyles();
  const { sender, body, sent_at, scrollRef, scrollToBottom } = props;

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid xs={1.3} item sx={{ height: "auto" }}>
        <Box className={classes.avatar}>
          <Avatar
            alt={sender.name}
            src={sender.avatar}
            sx={{ width: 40, height: 40, mt: 0.3 }}
          />
          <Typography>{sender.name}</Typography>
        </Box>
      </Grid>
      <Grid xs={"auto"} item>
        <List
          ref={scrollRef}
          sx={{
            maxWidth: 700,
            ml: "0.2em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            className={classes.messages}
            variant="body1"
            display="block"
          >
            {body}
          </Typography>
          <Typography
            title={moment(sent_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            variant="caption"
            display="block"
            sx={{ ml: "1em" }}
          >
            {moment(sent_at).fromNow()}
          </Typography>
        </List>
      </Grid>
    </Grid>
  );
}

{
  /* <Typography
  className={classes.messages}
  variant="body1"
  display="block"
>
  {msg}
</Typography> */
}

// <Grid container alignItems="center" sx={{ height: 400 }}>
// <Grid xs={1.2} item sx={{ height: "80%" }}>
//   <ListItemText
//     align={side}
//     primary={
//       <Box className={classes.avatar}>
//         <Avatar
//           alt={name}
//           src={img}
//           sx={{ width: 40, height: 40, mt: 1 }}
//         />
//         <Typography>{name}</Typography>
//       </Box>
//     }
//   />
// </Grid>
// <Grid xs={"auto"} item>
//   <List id="chat-windows-messages" sx={{ maxWidth: 900 }}>
//     <ListItemText primary={msg} align={side}></ListItemText>
//   </List>
// </Grid>
// </Grid>
