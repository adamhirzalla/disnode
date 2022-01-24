import {
  Button,
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { makeStyles } from "@mui/styles";
import ServerContext from "../../contexts/ServerContext";
import { editChannel } from "../../network/channelApi";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { DELETE_CHANNEL, EDIT_CHANNEL } from "../../utils/constants";

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

export default function ChannelEditDialog(props) {
  const { open, setOpen, input, setInput } = props;
  const { app, setChannel, setChannels, appDispatch } =
    useContext(ServerContext);
  const { server, channel } = app;
  const classes = useStyles();
  const buttonClasses = useDisButtonStyles();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setInput(app.channel.title);
    }, 500);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = async () => {
    if (input !== app.channel.title && input) {
      const channel = await editChannel(app.channel.id, input);
      // const channels = await editChannel(server.id, channel.id, input);
      // setChannels(channels);
      appDispatch({
        type: EDIT_CHANNEL,
        channel,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle style={{ fontSize: "1.55em" }}>Edit Channel</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
            marginBottom: "40px",
          }}
        >
          <Avatar
            style={{
              width: "70px",
              height: "70px",
            }}
            src={server.logo}
            imgProps={{ id: "image-preview" }}
          />
          <Typography variant="h6">{app.channel?.title}</Typography>
        </Box>
        <Grid container columnSpacing={12} rowSpacing={4}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              type="text"
              variant="outlined"
              label="Channel Title"
              value={input}
              onKeyDown={handleKeydown}
              onChange={(e) => setInput((prev) => e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={buttonClasses.cancel} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={buttonClasses.submit} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
