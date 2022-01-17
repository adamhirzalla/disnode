import { useContext, useState } from "react";
import ContainedButton from "../Button/CustomButton";
import ServerContext from "../../contexts/ServerContext";
import { createChannel } from "../../network/channelApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function NewChannelDialog() {
  const classes = useNewChannelDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const {
    app: { server },
    setNewChannel,
  } = useContext(ServerContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
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
    if (title) {
      setOpen(false);
      const serverId = server.id;
      const channel = await createChannel(serverId, { title });
      setNewChannel(channel);
      setTitle("");
    }
  };

  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple
        disableFocusRipple
        onClick={handleClickOpen}
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            fullWidth
            variant="standard"
            placeholder="Title"
            InputProps={{
              className: classes.root,
            }}
          />
        </DialogContent>
        <DialogActions>
          <ContainedButton variant="text" onClick={handleClose} name="Cancel" />
          <ContainedButton
            variant="contained"
            onClick={handleSubmit}
            name="Create"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
