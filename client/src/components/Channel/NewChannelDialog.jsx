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
import { CHANNEL_NEW } from "../../utils/constants";

export default function NewChannelDialog() {
  const classes = useNewChannelDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const {
    app: { server },
    setNewChannel,
  } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);

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
      if (channel) setNewChannel(channel);
      handleClose();
    } catch (e) {
      console.log("Failed to create channel");
    }
  };

  return (
    <div>
      <Button className={classes.addButton} onClick={handleClickOpen}>
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
          <DisButton
            // variant="text "
            disStyle="cancel"
            onClick={handleClose}
          >
            Cancel
          </DisButton>
          <DisButton disStyle="submit" onClick={handleSubmit}>
            Create
          </DisButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
