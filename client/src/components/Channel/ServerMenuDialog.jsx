import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import ServerContext from "../../contexts/ServerContext";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";

export default function ServerMenuDialog({ open, setOpen }) {
  const classes = useNewChannelDialogStyles();
  const buttonClasses = useDisButtonStyles();
  const {
    app: { server, servers },
  } = useContext(ServerContext);

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // click handler for confirm button
  const handleConfirm = () => {
    //TODO - need to link to server
    const serverId = server.id;
    const index = servers.findIndex((server) => {
      return server.id === serverId;
    });
    servers.splice(index, 1);

    setOpen(false);
  };

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        {/* {option === "Leave" ? ( */}
        <>
          <DialogTitle>{`Would you like to leave server?`}</DialogTitle>
          <DialogActions>
            <Button className={buttonClasses.cancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={buttonClasses.submit} onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogActions>
        </>
        {/* ) : (
          <>
            <DialogTitle>Invite code</DialogTitle>
            <DialogActions></DialogActions>
          </>
        )} */}
      </Dialog>
    </>
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
