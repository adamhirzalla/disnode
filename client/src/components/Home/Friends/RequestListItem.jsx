import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useServerDialogStyles } from "../../styles/useServerDialogStyles";
import {
  acceptRequest,
  answerRequest,
  removeRequest,
} from "../../../network/friendApi";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import {
  ADD_FRIEND,
  EDIT_FRIENDS,
  EDIT_REQEUSTS,
  REMOVE_REQUEST,
  UPDATE_FRIENDS,
} from "../../../utils/constants";
const [RECEIVED, SENT] = ["RECEIVED", "SENT"];
export default function RequestListItem(props) {
  const { user, view, received, sent } = props;
  const classes = useServerDialogStyles();
  const { dispatch } = useContext(AuthContext);

  // accept friend request
  const handleAnswer = async (requestId, answer) => {
    const { friends, request } = await answerRequest(requestId, answer);
    if (request) dispatch({ type: REMOVE_REQUEST, request });
    if (friends) dispatch({ type: UPDATE_FRIENDS, friends });

    // const accepted = await acceptRequest(sender.sender_id);
    // dispatch({ type: EDIT_FRIENDS, accepted });
  };

  // reject friend request
  // const handleReject = async () => {
  //   const requests = await answerRequest(requestId, false)
  //   // const rejected = await removeRequest(sender.id);
  //   // dispatch({ type: EDIT_REQEUSTS, rejected });
  // };

  // // cancel friend request
  // const handleCancel = async () => {
  //   const requests = await answerRequest(requestId, false)
  //   dispatch({ type: UPDATED_REQUESTS, requests });
  //   // const canceled = await removeRequest(receiver.id);
  //   // dispatch({ type: EDIT_REQEUSTS, canceled });
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={user.nickname}
            src={user.avatar}
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.text}
          sx={{ pl: "20px" }}
          primary={user.nickname}
        />
        {received ? (
          <>
            <IconButton
              onClick={() => handleAnswer(user.request_id, true)}
              sx={{ color: "green", opacity: 0.3, "&:hover": { opacity: 1 } }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
              onClick={() => handleAnswer(user.request_id, false)}
              sx={{ color: "red", opacity: 0.3, "&:hover": { opacity: 1 } }}
            >
              <HighlightOffIcon />
            </IconButton>
          </>
        ) : sent ? (
          <IconButton
            onClick={() => handleAnswer(user.request_id, false)}
            sx={{ color: "red", opacity: 0.3, "&:hover": { opacity: 1 } }}
          >
            <HighlightOffIcon />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
}
