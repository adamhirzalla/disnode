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

// const parsedConnections = [
//   <SteamSvg />,
//   <TwitterSvg />,
//   <RiotGamesSvg />,
//   <EpicGamesSvg />,
// ].map((icon, i) => {
//   return (
//     <IconButton key={i} onClick={() => console.log(i)}>
//       {icon}
//     </IconButton>
//   );
// });

const useStyles = makeStyles(() => ({
  asd: { width: "60ch", margin: "0 auto" },
  actions: { display: "flex", justifyContent: "center" },
}));
export default function ConnectionsDialog(props) {
  const { input, url, setOpen, open, setUrl, iconId, setInput } = props;
  const classes = useStyles();

  const handleAction = () => {
    // setInput((prev) => ({
    //   ...prev,
    //   [iconId]: url,
    // }));
    setInput((prev) => ({
      ...prev,
      socials: [
        ...prev.socials.filter((social) => social.id !== iconId),
        { id: iconId, url },
      ],
    }));

    setOpen(false);
    setUrl("");
  };
  const handleCancel = () => {
    setUrl("");
    setOpen(false);
  };

  return (
    <Dialog className={classes.asd} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Enter a URL! {iconId}</DialogTitle>
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
          placeholder={input[iconId]?.url}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
