import { useContext, useState } from "react";
import CustomButton from "../Button/DisButton";
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
import DisButton from "../Button/DisButton";

export default function NewChannelDialog() {
  const classes = useNewChannelDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const {
    app: { server },
    setNewChannel,
  } = useContext(ServerContext);

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
    if (title) {
      setOpen((prev) => false);
      const serverId = server.id;
      const channel = await createChannel(serverId, { title });
      setNewChannel(channel);
      setTitle((prev) => "");
    }
  };

  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple={true}
        disablefocusripple
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
          <CustomButton variant="text" onClick={handleClose} name="Cancel" />
          <DisButton variant="contained" onClick={handleSubmit} name="Create" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
