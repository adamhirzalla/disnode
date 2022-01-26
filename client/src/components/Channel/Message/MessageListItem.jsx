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
import { DELETE_MESSAGE, MESSAGE_DELETE } from "../../../utils/constants";
import { faCrown } from "@fortawesome/free-solid-svg-icons/faCrown";
import StarIcon from "@mui/icons-material/Star";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const useStyles = makeStyles(() => ({
  message: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: "17px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  divider: { width: "100px", borderColor: "rgba(0, 0, 0, 0.2)" },
  name: {
    "& p": {
      fontWeight: "bold",
      fontSize: "1.1em",
      color: "rgb(199, 58, 58,1)",
      // textTransform: "uppercase",
      // "&.MuiTypography-root": { color: "green" },
    },
  },
  owner: {
    "& p": {
      color: "rgb(199, 58, 58,1)",
    },
  },
  admin: {
    "& p": {
      color: "rgb(230, 128, 39,1)",
    },
  },
  user: {
    "& p": {
      color: "rgb(52, 138, 17)",
    },
  },
  views: {
    alignSelf: "end",
    position: "absolute",
    bottom: "5px",
    right: "7px",
    "& .MuiAvatar-root": {
      width: "30px",
      height: "30px",
      fontSize: "15px",
    },
  },
  stack: {
    flexGrow: 1,
    maxWidth: "840px",
  },
  viewers: { width: "30px", height: "30px" },
  icon: {
    position: "absolute",
    top: "8px",
    left: "10px",
    color: "yellow",

    fontSize: "medium",
  },
  // right: {
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "100%",
  // },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
    opacity: "0.4",

    "&:hover": { opacity: 1 },
  },
  body: {
    padding: "0 0.5em",
    "& span": {
      fontSize: "0.95em",
    },
    "& p": {
      fontSize: "0.75em",
      color: "black",
    },
  },
  mention: {
    backgroundColor: "rgba(250,209,102, 0.3)",
    borderRadius: 5,
    borderLeft: "5px solid rgba(250,209,102, 1)",
  },
  // right: {
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: "column",
  // },
}));
export default function MessageListItem(props) {
  // const classes = useMessageListItemStyles();
  const classes = useStyles();
  const { message, index, messages } = props;
  const { views } = message;
  const {
    app: { members, server },
    appDispatch,
  } = useContext(ServerContext);
  const {
    state: { user, socket },
  } = useContext(AuthContext);
  const [throttle, setThrottle] = useState(false);
  const nameClasses = classNames(classes.name, {
    [classes.owner]:
      members.find((m) => m.user_id === message.sender_id)?.role === "owner",
    [classes.admin]:
      members.find((m) => m.user_id === message.sender_id)?.role === "admin",
    [classes.user]:
      members.find((m) => m.user_id === message.sender_id)?.role === "user",
  });
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

  const messageClasses = classNames(classes.body, {
    [classes.mention]: message.mention,
  });

  const role = members.find((m) => m.user_id === user.id).role;

  const handleDelete = () => {
    if (throttle) return alert("HOLD ON!!");
    controlSpam();
  };

  const controlSpam = async () => {
    setThrottle(true);
    const deletedMessage = await deleteMessage(message.id);
    deletedMessage.server_id = server.id;
    socket.emit(MESSAGE_DELETE, deletedMessage);
    appDispatch({ type: DELETE_MESSAGE, message: deletedMessage });
    setThrottle(false);
  };
  if (message.body.includes(`@${user.nickname}`)) message.mention = true;
  return (
    <>
      <Divider
        variant="inset"
        component="li"
        sx={{ backgroundColor: "rgb(16, 16, 16,0.4)" }}
      />
      <ListItem
        // secondaryAction={

        // }
        className={classes.message}
      >
        <ListItemAvatar className={classes.avatar}>
          <Avatar
            alt={message.sender_nickname}
            src={message.sender_avatar}
            sx={{
              width: 60,
              height: 60,
              mt: 0.3,
              mr: "0.5em",
              border: "2px solid",
            }}
          />
        </ListItemAvatar>
        {members.find((m) => m.user_id === message.sender_id)?.role ===
          "owner" && (
          <FontAwesomeIcon icon={faCrown} className={classes.icon} />
        )}
        <Stack className={classes.stack}>
          <ListItemText
            // primary={message.sender_nickname}
            secondary={message.sender_nickname}
            className={nameClasses}
          />
          <Divider className={classes.divider} />
          <ListItemText
            // inset
            title={moment(message.sent_at).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
            primary={message.body}
            secondary={moment(message.sent_at).fromNow()}
            className={messageClasses}
          />
        </Stack>
        {/* <Box className={classes.right}> */}
        {(message.sender_id === user.id || role !== "user") && (
          <IconButton
            aria-label="delete"
            className={classes.delete}
            disableRipple
            onClick={handleDelete}
          >
            <DeleteIcon sx={{ color: "rgb(199, 58, 58,1)" }} />
          </IconButton>
        )}
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
        {/* </Box> */}
      </ListItem>
    </>
  );
}
