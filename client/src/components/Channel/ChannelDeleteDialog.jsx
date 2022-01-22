import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import ServerContext from "../../contexts/ServerContext";
import { deleteChannel } from "../../network/channelApi";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

const useStyles = makeStyles({
  dialogPaper: {
    display: "flex",
    width: "18%",
    alignItems: "center",
    borderRadius: "1em",
    textAlign: "center",
    padding: "20px 20px 40px 40px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflowY: "auto",
  },
});

export default function ChannelDeleteDialog({ open, setOpen, channel }) {
  const classes = useStyles();
  const buttonClasses = useDisButtonStyles();
  const {
    app: { server },
    setChannels,
  } = useContext(ServerContext);

  const handleDelete = async () => {
    const channels = await deleteChannel(server.id, channel.id);
    setChannels(channels);
    setOpen(false);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle># {channel?.title}</DialogTitle>
      <DialogContentText>{`Are you sure you want to delete the channel?`}</DialogContentText>
      <DialogActions>
        <Button className={buttonClasses.cancel} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button className={buttonClasses.submit} onClick={handleDelete}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
