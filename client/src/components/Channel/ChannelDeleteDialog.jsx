import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ServerContext from "../../contexts/ServerContext";
import { deleteChannel } from "../../network/channelApi";
import {
  CHANNEL_DELETE,
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  DELETE_CHANNEL,
} from "../../utils/constants";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

const useStyles = makeStyles({
  dialog: {
    display: "flex",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    "&.MuiPaper-root": {},
    // display: "flex",
    // width: "18%",
    // alignItems: "center",
    // borderRadius: "1em",
    // textAlign: "center",
    // padding: "20px 20px 40px 40px",
    // flexDirection: "column",
    // justifyContent: "center",
    // overflowY: "auto",
  },
});

export default function ChannelDeleteDialog({ open, setOpen }) {
  const classes = useStyles();
  const buttonClasses = useDisButtonStyles();
  const { app, setChannels, appDispatch } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);
  const { channel } = app;

  const handleDelete = async () => {
    // const channels = await deleteChannel(server.id, channel.id);
    // setChannels(channels);
    const channel = await deleteChannel(app.channel.id);
    socket.emit(CHANNEL_DELETE, channel);
    socket.emit(CHANNEL_LEAVE, channel.id);
    const channels = Object.values(app.server?.channels).filter(
      (c) => c.id !== channel.id
    );
    socket.emit(CHANNEL_JOIN, {
      id: channels[0]?.id,
      server_id: app.server.id,
    });
    appDispatch({
      type: DELETE_CHANNEL,
      channel,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Stack classesName={classes.dialog}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          # {channel?.title}
        </DialogTitle>
        <DialogContentText
          sx={{ display: "flex", justifyContent: "center", padding: "0 20px" }}
        >{`Are you sure you want to delete this channel?`}</DialogContentText>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Button
            variant="outlined"
            disableRipple
            color="primary"
            onClick={() => setOpen(false)}
            sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableRipple
            onClick={handleDelete}
            sx={{
              color: "white",
              opacity: 0.8,
              "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
              backgroundColor: "rgb(199, 58, 58,0.8)",
            }}
            // startIcon={<DoNotDisturbIcon />}
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
