import moment from "moment";
import { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { useMessageListItemStyles } from "../../styles/useMessageListItemStyles";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  message: {
    alignItems: "flex-start",
  },
  divider: { width: "100px", borderColor: "rgba(0, 0, 0, 0.5)" },
  name: {
    fontWeight: "bold",
    fontSize: "1em",
    textTransform: "uppercase",
    // "&.MuiTypography-root": { color: "green" },
  },
}));
export default function MessageListItem(props) {
  // const classes = useMessageListItemStyles();
  const classes = useStyles();
  const { sender, body, sent_at, scrollRef, scrollToBottom, message } = props;

  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" className={classes.action}>
            <DeleteIcon />
          </IconButton>
        }
        className={classes.message}
      >
        <ListItemAvatar className={classes.avatar}>
          <Avatar
            alt={message.sender_nickname}
            src={message.sender_avatar}
            sx={{ width: 55, height: 55, mt: 0.3, mr: "0.5em" }}
          />
        </ListItemAvatar>
        <Stack>
          <ListItemText
            title={moment(message.sent_at).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
            primary={message.sender_nickname}
            secondary={moment(message.sent_at).fromNow()}
            className={classes.name}
          />
          {/* <Typography variant="button" className={classes.name}>
            {message.sender_nickname}
          </Typography> */}
          {/* <Divider className={classes.divider} /> */}
          <ListItemText
            // inset
            title={moment(message.sent_at).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
            primary={message.body}
            // secondary={moment(message.sent_at).fromNow()}
            className={classes.body}
          />
        </Stack>
      </ListItem>
    </>
  );
}

// <Grid container alignItems="center" className={classes.root}>
//   <Grid xs={1.3} item sx={{ height: "auto" }}>
//     <Box className={classes.avatar}>
//       <Avatar
//         alt={sender.name}
//         src={sender.avatar}
//         sx={{ width: 40, height: 40, mt: 0.3 }}
//       />
//       <Typography>{sender.name}</Typography>
//     </Box>
//   </Grid>
//   <Grid xs={"auto"} item>
//     <List
//       ref={scrollRef}
//       sx={{
//         maxWidth: 700,
//         ml: "0.2em",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Typography
//         className={classes.messages}
//         variant="body1"
//         display="block"
//       >
//         {body}
//       </Typography>
//       <Typography
//         title={moment(sent_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}
//         variant="caption"
//         display="block"
//         sx={{ ml: "1em" }}
//       >
//         {moment(sent_at).fromNow()}
//       </Typography>
//     </List>
//   </Grid>
// </Grid>

// {
/* <Typography
  className={classes.messages}
  variant="body1"
  display="block"
>
  {msg}
</Typography> */
// }

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
