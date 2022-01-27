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
import { getMembers, removeMember, updateRole } from "../../network/memberApi";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";
import { sendRequest } from "../../network/friendApi";
import TwitchSvg from "../SvgIcons/TwitchSvg";
import SpotifySvg from "../SvgIcons/SpotifySvg";
import YoutubeSvg from "../SvgIcons/YoutubeSvg";
import RedditSvg from "../SvgIcons/RedditSvg";
import {
  DELETE_MEMBER,
  MEMBER_KICK,
  MEMBER_UPDATE,
  EDIT_REQEUSTS,
  UPDATE_REQUESTS,
} from "../../utils/constants";
// import Blizzard from "../SvgIcons/blizzard.svg";

const [PROFILE, ADD, ADMIN, DEMOTE, KICK, OWNERSHIP] = [
  "PROFILE",
  "ADD",
  "ADMIN",
  "DEMOTE",
  "KICK",
  "OWNERSHIP",
];

const icons = [
  <SteamSvg />,
  <TwitchSvg />,
  <SpotifySvg />,
  <YoutubeSvg />,
  <TwitterSvg />,
  <RedditSvg />,
];

const useStyles = makeStyles(() => ({
  root: { backgroundColor: "white" },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "60%",
  },
  content: { paddingBottom: 0, display: "flex", justifyContent: "center" },
  icons: { opacity: "0.7", "&:hover": { opacity: 1 } },
  dialog: {
    "& .MuiPaper-root": {
      maxWidth: "375px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
export default function MemberDialog(props) {
  const { action, member, setOpen, setAction, open } = props;
  const {
    setMembers,
    app: { server },
    appDispatch,
  } = useContext(ServerContext);
  const {
    state: { user, socket },
    dispatch,
  } = useContext(AuthContext);

  const classes = useStyles();

  const closeDialog = (members) => {
    setOpen(false);
    setAction(null);
    socket.emit(MEMBER_UPDATE, members, server.id);
    setMembers(members);
  };

  const handleAction = async () => {
    // console.log(`making a ${action} request on member: ${member.nickname}`);
    try {
      if (action === ADMIN) {
        // getting back an array of members with updated role
        const members = await updateRole(server.id, member.id, "admin");
        closeDialog(members);
      } else if (action === DEMOTE) {
        // getting back an array of members with updated role
        const members = await updateRole(server.id, member.id, "user");
        closeDialog(members);
      } else if (action === OWNERSHIP) {
        const getMembers = await updateRole(server.id, member.id, "owner");
        const myMemeberId = getMembers.find((m) => m.user_id === user.id).id;
        const members = await updateRole(server.id, myMemeberId, "admin");
        closeDialog(members);
      } else if (action === KICK) {
        await removeMember(server.id, member.id);
        socket.emit(MEMBER_KICK, member, server.id);
        // const member = await getMembers(server.id);
        setOpen(false);
        setAction(null);
        appDispatch({
          type: DELETE_MEMBER,
          member,
        });
      } else if (action === ADD) {
        const requests = await sendRequest(member.user_id);
        dispatch({ type: UPDATE_REQUESTS, requests });
        setOpen(false);
        setAction(null);
      }
    } catch (e) {}
  };
  const connetion = member ? member.socials : user.socials;
  const parsedConnections = connetion
    ?.filter((e) => e.url)
    .map((social, i) => {
      return (
        <IconButton
          disableRipple
          className={classes.icons}
          key={social.id}
          sx={{ "& svg": { minWidth: "50px" } }}
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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
    >
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
          : action === OWNERSHIP
          ? `Pass Ownership to ${member.nickname}`
          : ""}
      </DialogTitle>

      {/* MEMBER'S PROFILE  */}

      <DialogContent className={classes.content}>
        {action === PROFILE && <MemberProfile member={member} user={user} />}
      </DialogContent>

      <DialogActions className={classes.actions}>
        {action === PROFILE ? (
          parsedConnections
        ) : (
          <>
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
              onClick={handleAction}
              sx={{
                color: "white",
                opacity: 0.8,
                "&:hover": {
                  opacity: 1,
                  backgroundColor: "rgb(199, 58, 58,1)",
                },
                backgroundColor: "rgb(199, 58, 58,0.8)",
              }}
              // startIcon={<DoNotDisturbIcon />}
            >
              Confirm
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
