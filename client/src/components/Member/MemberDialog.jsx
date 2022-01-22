import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  SvgIcon,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MemberProfile from "./MemberProfile";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import DiscordSvg from "../SvgIcons/DiscordSvg";
import OriginSvg from "../SvgIcons/OriginSvg";
import BlizzardSvg from "../SvgIcons/BlizzardSvg";
import { getMembers, removeMember, updateRole } from "../../network/memberApi";
import ServerContext from "../../contexts/ServerContext";
// import Blizzard from "../SvgIcons/blizzard.svg";

const [PROFILE, ADD, ADMIN, DEMOTE, KICK] = [
  "PROFILE",
  "ADD",
  "ADMIN",
  "DEMOTE",
  "KICK",
];

const icons = [
  <SteamSvg />,
  <EpicGamesSvg />,
  <BlizzardSvg />,
  <DiscordSvg />,
  <RiotGamesSvg />,
  <OriginSvg />,
];

const useStyles = makeStyles(() => ({
  root: { backgroundColor: "white" },
  actions: { display: "flex", justifyContent: "center" },
  content: { paddingBottom: 0 },
  icons: { opacity: "0.7", "&:hover": { opacity: 1 } },
}));
export default function MemberDialog(props) {
  const { action, member, setOpen, setAction, open } = props;
  const {
    setMembers,
    app: { members, server },
  } = useContext(ServerContext);

  const classes = useStyles();

  const handleAction = async () => {
    // console.log(`making a ${action} request on member: ${member.nickname}`);

    try {
      if (action === ADMIN) {
        // getting back an array of members with updated role
        const members = await updateRole(server.id, member.id, "admin");
        setOpen(false);
        setAction(null);
        setMembers(members);
      } else if (action === DEMOTE) {
        // getting back an array of members with updated role
        const members = await updateRole(server.id, member.id, "user");
        setOpen(false);
        setAction(null);
        setMembers(members);
      } else if (action === ADD) {
      } else if (action === KICK) {
        await removeMember(server.id, member.id);
        const members = await getMembers(server.id);
        setOpen(false);
        setAction(null);
        setMembers(members);
      }
    } catch (e) {}
  };

  const parsedConnections = member.socials
    ?.filter((e) => e.url)
    .map((social, i) => {
      return (
        <IconButton
          disableRipple
          className={classes.icons}
          key={social.id}
          onClick={() => window.open(social.url, "_blank")}
        >
          {social.id === 1
            ? icons[0]
            : social.id === 2
            ? icons[1]
            : social.id === 3
            ? icons[2]
            : social.id === 4
            ? icons[3]
            : social.id === 5
            ? icons[4]
            : social.id === 6
            ? icons[5]
            : ""}
        </IconButton>
      );
    });

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
          : action === DEMOTE
          ? `Demote ${member.nickname} to User?`
          : ""}
      </DialogTitle>

      {/* MEMBER'S PROFILE  */}

      <DialogContent className={classes.content}>
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
