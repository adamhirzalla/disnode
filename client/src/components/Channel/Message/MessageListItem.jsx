import moment from "moment";
import { useContext, useState } from "react";
import {
  Box,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Stack,
  AvatarGroup,
  Tooltip,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import ServerContext from "../../../contexts/ServerContext";
import AuthContext from "../../../contexts/AuthContext";
import { deleteMessage } from "../../../network/messageApi";
import { DELETE_MESSAGE } from "../../../utils/constants";
const useStyles = makeStyles(() => ({
  message: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  divider: { width: "100px", borderColor: "rgba(0, 0, 0, 0.2)" },
  name: {
    "& p": {
      fontWeight: "bold",
      fontSize: "1em",
      // textTransform: "uppercase",
      // "&.MuiTypography-root": { color: "green" },
    },
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
  body: {
    "& span": {
      fontSize: "0.95em",
    },
    "& p": {
      fontSize: "0.75em",
    },
  },
}));
export default function MessageListItem(props) {
  // const classes = useMessageListItemStyles();
  const classes = useStyles();
  const { message, index, messages } = props;
  const { views } = message;
  const {
    app: { members },
    appDispatch,
  } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [throttle, setThrottle] = useState(false);
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

  const role = members.find((m) => m.user_id === user.id).role;

  const handleDelete = () => {
    if (throttle) return alert("HOLD ON!!");
    controlSpam();
  };

  const controlSpam = async () => {
    setThrottle(true);
    const deletedMessage = await deleteMessage(message.id);
    setThrottle(false);
    appDispatch({ type: DELETE_MESSAGE, message: deletedMessage });
  };

  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem
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
            // primary={message.sender_nickname}
            secondary={message.sender_nickname}
            className={classes.name}
          />
          <Divider className={classes.divider} />
          <ListItemText
            // inset
            title={moment(message.sent_at).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
            primary={message.body}
            secondary={moment(message.sent_at).fromNow()}
            className={classes.body}
          />
        </Stack>
        <Box className={classes.right}>
          {views.length > 0 && (
            <Tooltip title={tooltip} arrow placement="bottom">
              <AvatarGroup max={4} className={classes.views}>
                {views.map((viewer, i) => {
                  return (
                    (!messages
                      .slice(index + 1)
                      .map((message) => {
                        return !message?.views.find(
                          (e) => e.viewer_id === viewer?.viewer_id
                        );
                      })
                      .includes(false) ||
                      !messages[index + 1]) &&
                    viewer &&
                    viewer.viewer_id !== user.id && (
                      <Avatar
                        key={i}
                        alt={viewer?.viewer_nickname}
                        src={viewer?.viewer_avatar}
                        className={classes.viewers}
                      />
                    )
                  );
                })}
              </AvatarGroup>
            </Tooltip>
          )}
          {(message.sender_id === user.id || role !== "user") && (
            <IconButton
              aria-label="delete"
              className={classes.delete}
              disableRipple
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </ListItem>
    </>
  );
}
