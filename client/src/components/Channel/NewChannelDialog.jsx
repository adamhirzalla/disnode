import { useContext, useState } from "react";
import DisButton from "../Button/DisButton";
import ServerContext from "../../contexts/ServerContext";
import { createChannel } from "../../network/channelApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DisTextField from "../Inputs/DisTextField";
import AuthContext from "../../contexts/AuthContext";
import {
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  CHANNEL_NEW,
} from "../../utils/constants";

export default function NewChannelDialog() {
  const classes = useNewChannelDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { app, setNewChannel } = useContext(ServerContext);
  const {
    state: { socket, user },
  } = useContext(AuthContext);
  const { server } = app;

  const handleClickOpen = () => {
    setOpen((prev) => true);
  };

  const handleClose = () => {
    setOpen((prev) => false);
    setTitle((prev) => "");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // key down handler that triggers when user press enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // submit handler that creates a new channel
  const handleSubmit = async () => {
    try {
      const serverId = server.id;
      const channel = await createChannel(serverId, { title });
      socket.emit(CHANNEL_NEW, channel);
      if (app.channel) socket.emit(CHANNEL_LEAVE, app.channel.id);
      setNewChannel(channel, user);
      socket.emit(CHANNEL_JOIN, {
        id: channel.id,
        server_id: serverId,
      });
      handleClose();
    } catch (e) {
      console.log("Failed to create channel");
    }
  };

  return (
    <div>
      <Button
        className={classes.addButton}
        onClick={handleClickOpen}
        disableRipple
      >
        <AddCircleIcon fontSize="small" />
      </Button>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.dialogTitle}>
          Create Channel
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DisTextField
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disStyle="text"
            fullWidth
            required
            variant="outlined"
            placeholder="Title"
            InputProps={{
              className: classes.root,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disableRipple
            color="primary"
            onClick={handleClose}
            sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableRipple
            onClick={handleSubmit}
            sx={{
              color: "white",
              opacity: 0.8,
              "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
              backgroundColor: "rgb(199, 58, 58,0.8)",
            }}
            // startIcon={<DoNotDisturbIcon />}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
