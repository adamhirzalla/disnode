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
  AvatarGroup,
  Tooltip,
} from "@mui/material";
import { useMessageListItemStyles } from "../../styles/useMessageListItemStyles";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  message: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  divider: { width: "100px", borderColor: "rgba(0, 0, 0, 0.2)" },
  name: {
    fontWeight: "bold",
    fontSize: "1em",
    textTransform: "uppercase",
    // "&.MuiTypography-root": { color: "green" },
  },
  views: { alignSelf: "end" },
  stack: {
    flexGrow: 1,
  },
  viewers: { width: "25px", height: "25px" },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  delete: {
    opacity: "0.4",
    "&:hover": { opacity: 1 },
  },
}));
export default function MessageListItem(props) {
  // const classes = useMessageListItemStyles();
  const classes = useStyles();
  const { sender, body, sent_at, scrollRef, scrollToBottom, message } = props;
  const { views } = message;
  let tooltip;
  if (views.length === 1) tooltip = `seen by ${views[0].viewer_nickname}`;
  if (views.length > 3)
    tooltip = `seen by ${views[0].viewer_nickname}, ${
      views[1].viewer_nickname
    }, ${views[2].viewer_nickname} and ${views.length - 3} others`;
  if (views.length === 2)
    tooltip = `seen by ${views[0].viewer_nickname} and ${views[1].viewer_nickname}`;
  if (views.length === 3)
    tooltip = `seen by ${views[0].viewer_nickname}, ${views[1].viewer_nickname} and ${views[2].viewer_nickname}`;

  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem
        className={classes.delete}
        // secondaryAction={

        // }
        className={classes.message}
      >
        <ListItemAvatar className={classes.avatar}>
          <Avatar
            alt={message.sender_nickname}
            src={message.sender_avatar}
            sx={{ width: 55, height: 55, mt: 0.3, mr: "0.5em" }}
          />
        </ListItemAvatar>
        <Stack className={classes.stack}>
          <ListItemText
            title={moment(message.sent_at).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
            primary={message.sender_nickname}
            secondary={moment(message.sent_at).fromNow()}
            className={classes.name}
          />
          <Divider className={classes.divider} />
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
        <Box className={classes.right}>
          <IconButton
            aria-label="delete"
            className={classes.delete}
            disableRipple
          >
            <DeleteIcon />
          </IconButton>
          {views.length > 0 && (
            <Tooltip title={tooltip} arrow placement="bottom">
              <AvatarGroup total={views.length} className={classes.views}>
                {views[0] && (
                  <Avatar
                    alt={views[0]?.viewer_nickname}
                    src={views[0]?.viewer_avatar}
                    className={classes.viewers}
                  />
                )}
                {views[1] && (
                  <Avatar
                    alt={views[1]?.viewer_nickname}
                    src={views[1]?.viewer_avatar}
                    className={classes.viewers}
                  />
                )}
                {views[2] && (
                  <Avatar
                    alt={views[2]?.viewer_nickname}
                    src={views[2]?.viewer_avatar}
                    className={classes.viewers}
                  />
                )}
                {views[3] && (
                  <Avatar
                    alt={views[3]?.viewer_nickname}
                    src={views[3]?.viewer_avatar}
                    className={classes.viewers}
                  />
                )}
              </AvatarGroup>
            </Tooltip>
          )}
        </Box>
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
