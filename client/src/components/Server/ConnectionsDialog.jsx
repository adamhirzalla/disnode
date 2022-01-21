import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";

const parsedConnections = [
  <SteamSvg />,
  <TwitterSvg />,
  <RiotGamesSvg />,
  <EpicGamesSvg />,
].map((icon, i) => {
  return (
    <IconButton key={i} onClick={() => console.log(i)}>
      {icon}
    </IconButton>
  );
});

const useStyles = makeStyles(() => ({
  asd: { width: "60ch", margin: "0 auto" },
  actions: { display: "flex", justifyContent: "center" },
}));
export default function ConnectionsDialog(props) {
  const { icon, input, setInput, setOpen, open, initialInput } = props;

  const classes = useStyles();

  const handleAction = (e, icon) => {
    setInput((prev) => ({
      ...prev,
      socials: [...prev.socials, { id: icon, url: e.target.value }],
    }));
    setOpen(false);

    // if (icon === STEAM) setInput((prev) => ({ ...prev, [icon]: input[icon] }));
    // else if (icon === EPIC)
    //   setInput((prev) => ({ ...prev, [icon]: input[icon] }));
    // else if (icon === BLIZZARD)
    //   setInput((prev) => ({ ...prev, [icon]: input[icon] }));
    // else if (icon === DISCORD)
    //   setInput((prev) => ({ ...prev, [icon]: input[icon] }));
    // else if (icon === RIOT)
    //   setInput((prev) => ({ ...prev, [icon]: input[icon] }));
    // else if (icon === ORIGIN)
    //   setInput((prev) => ({ ...prev, [icon]: input[icon] }));
  };

  const handleCancel = () => {
    setInput(initialInput);
    setOpen(false);
  };

  return (
    <Dialog className={classes.asd} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Enter a URL!</DialogTitle>
      <DialogContent>
        <DialogContentText color="error">
          Note: This will be public to your friends and mutual server members.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Connection URL"
          type="text"
          fullWidth
          variant="standard"
          value={input[icon]}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, [icon]: e.target.value }))
          }
        />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="info" onClick={handleAction}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
