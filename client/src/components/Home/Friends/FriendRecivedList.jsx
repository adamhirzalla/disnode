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
import { acceptRequest, removeRequest } from "../../../network/friendApi";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { EDIT_FRIENDS, EDIT_REQEUSTS } from "../../../utils/constants";

export default function FriendRecivedList(props) {
  const { sender, receiver, request } = props;
  const classes = useServerDialogStyles();
  const { dispatch } = useContext(AuthContext);

  // accept friend request
  const handleAccept = async () => {
    const accepted = await acceptRequest(sender.sender_id);
    dispatch({ type: EDIT_FRIENDS, accepted });
  };

  // reject friend request
  const handleReject = async () => {
    const rejected = await removeRequest(sender.id);
    dispatch({ type: EDIT_REQEUSTS, rejected });
  };

  // cancel friend request
  const handleCancel = async () => {
    const canceled = await removeRequest(receiver.id);
    dispatch({ type: EDIT_REQEUSTS, canceled });
  };

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
            alt={request ? sender.nickname : receiver.nickname}
            src={request ? sender.avatar : receiver.avatar}
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.text}
          sx={{ pl: "20px" }}
          primary={request ? sender.full_name : receiver.full_name}
        />
        {request ? (
          <>
            <IconButton
              onClick={handleAccept}
              sx={{ color: "green", opacity: 0.3, "&:hover": { opacity: 1 } }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
              onClick={handleReject}
              sx={{ color: "red", opacity: 0.3, "&:hover": { opacity: 1 } }}
            >
              <HighlightOffIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            onClick={handleCancel}
            sx={{ color: "red", opacity: 0.3, "&:hover": { opacity: 1 } }}
          >
            <HighlightOffIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
