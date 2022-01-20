import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MemberProfile from "./MemberProfile";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";

const [PROFILE, ADD, ADMIN, KICK] = ["PROFILE", "ADD", "ADMIN", "KICK"];

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
  root: { backgroundColor: "white" },
  actions: { display: "flex", justifyContent: "center" },
}));
export default function MemberDialog(props) {
  const { action, member, setOpen, open } = props;

  const classes = useStyles();

  const handleAction = () => {
    console.log(`making a ${action} request on member: ${member.nickname}`);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {action !== PROFILE && "Are you sure you want to "}
        {action === ADD
          ? `Add ${member.nickname} as a Friend?`
          : action === ADMIN
          ? `Assign Admin role to ${member.nickname}?`
          : action === KICK
          ? `Kick ${member.nickname} from the Server?`
          : ""}
      </DialogTitle>
      <DialogContent>
        {action === PROFILE && <MemberProfile member={member} />}
      </DialogContent>

      <DialogActions className={classes.actions}>
        {action === PROFILE ? (
          parsedConnections
        ) : (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="info" onClick={handleAction}>
              Confirm
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
