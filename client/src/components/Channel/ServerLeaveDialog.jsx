import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import { removeMember } from "../../network/memberApi";
import { getServers } from "../../network/serverApi";
import { HOME, MEMBER_UPDATE, SERVER_LEAVE } from "../../utils/constants";

export default function ServerLeaveDialog(props) {
  const { open, setOpen, role } = props;
  const classes = useNewChannelDialogStyles();
  const buttonClasses = useDisButtonStyles();
  const {
    app: { server },
    setServers,
    setMode,
  } = useContext(ServerContext);
  const {
    state: { user, socket },
  } = useContext(AuthContext);

  // click handler for confirm button
  const handleConfirm = async () => {
    const memberId = server.members.find((e) => e.user_id == user.id).id;
    const members = await removeMember(server.id, memberId);
    socket.emit(MEMBER_UPDATE, members, server.id);
    socket.emit(SERVER_LEAVE, server.id);
    const servers = await getServers();
    await setServers(servers);
    setOpen(false);
    setMode(HOME);
  };

  const confirmation =
    role === "owner"
      ? "Pass your ownership before leaving"
      : "Would you like to leave server?";

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>{confirmation}</DialogTitle>
      <DialogActions>
        <Button className={buttonClasses.cancel} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        {role !== "owner" && (
          <Button className={buttonClasses.submit} onClick={handleConfirm}>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

// Stretch - make invite code blur
// sx={{
//   color: `#f5f5f5`,
//   backgroundColor: `transparent`,
//   filter: `blur(5px)`,
//   transition: `.5s`,
//   transitionDelay: `.5s`,
//   webkitFilter: `blur(5px)`,
//   cursor: `pointer`,
// }}

// padding: 0;
// border-radius: 5px;
// width: 100%;
// color: #f5f5f5;
// font-weight: 700;
// border: none;
// background-color: transparent;
// -webkit-filter: blur(5px);
// filter: blur(5px);
// transition: .5s;
// transition-delay: .5s;
// cursor: pointer;
