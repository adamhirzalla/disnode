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

const [STEAM, EPIC, BLIZZARD, DISCORD, RIOT, ORIGIN] = [
  "STEAM",
  "EPIC",
  "BLIZZARD",
  "DISCORD",
  "RIOT",
  "ORIGIN",
];

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
  const { icon, input, setInput, setOpen, open } = props;
  const [value, setValue] = useState("");

  const classes = useStyles();

  const handleAction = () => {
    if (icon === STEAM) setInput((prev) => ({ ...prev, steam: value }));
    else if (icon === EPIC) setInput((prev) => ({ ...prev, epic: value }));
    else if (icon === BLIZZARD)
      setInput((prev) => ({ ...prev, blizard: value }));
    else if (icon === DISCORD)
      setInput((prev) => ({ ...prev, discord: value }));
    else if (icon === RIOT) setInput((prev) => ({ ...prev, riot: value }));
    else if (icon === ORIGIN) setInput((prev) => ({ ...prev, origin: value }));
    setOpen(false);
    setValue("");
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
          // id="name"
          label="Connection URL"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="info" onClick={handleAction}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
