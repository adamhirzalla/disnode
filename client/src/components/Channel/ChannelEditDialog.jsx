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
  const { open, setOpen, input, setInput, channel } = props;
  const {
    app: { server },
    setChannel,
    setChannels,
  } = useContext(ServerContext);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setInput(channel.title);
    }, 500);
  };

  const handleSave = async () => {
    if (input !== channel.title && input) {
      const channels = await editChannel(server.id, channel.id, input);
      channels.sort((a, b) => a.id - b.id);
      setChannels(channels);
      setChannel(channel.id);
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
          <Typography variant="h6">{server.title}</Typography>
        </Box>
        <Grid container columnSpacing={12} rowSpacing={4}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              type="text"
              variant="outlined"
              label="Channel Title"
              value={input}
              // placeholder={input}
              onChange={(e) => setInput((prev) => e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
