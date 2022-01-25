import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useServerDialogStyles } from "../../styles/useServerDialogStyles";
import { acceptRequest, rejectRequest } from "../../../network/friendApi";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { EDIT_FRIENDS, EDIT_RECEIVED } from "../../../utils/constants";

export default function FriendRecivedList(props) {
  const { sender } = props;
  const { sender_id, nickname, avatar, full_name, id } = sender;
  const classes = useServerDialogStyles();
  const { dispatch } = useContext(AuthContext);

  const handleAccept = async () => {
    const accepted = await acceptRequest(sender_id);
    dispatch({ type: EDIT_FRIENDS, accepted });
  };
  const handleReject = async () => {
    const rejected = await rejectRequest(sender_id);
    dispatch({ type: EDIT_RECEIVED, rejected });
  };

  return (
    <Box
      key={id}
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
          <Avatar alt={nickname} src={avatar} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText
          className={classes.text}
          sx={{ pl: "20px" }}
          primary={full_name}
        />
        <IconButton
          onClick={handleAccept}
          sx={{ color: "green", opacity: 0.3, "&:hover": { opacity: 1 } }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton
          onClick={handleReject}
          sx={{ color: "red", opacity: 0.3, "&:hover": { opacity: 1 } }}
        >
          <HighlightOffIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
