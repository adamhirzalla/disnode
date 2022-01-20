import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { useContext, useState } from "react";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import classNames from "classnames";
import ServerContext from "../../contexts/ServerContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const useSettingDialogStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      backgroundColor: "#ba000d",
      color: "white",
      "&:hover": { backgroundColor: "#9b0000" },
    },
  })
);

export default function SettingDialog({ setting, setAnchorUser }) {
  const [open, setOpen] = useState(false);
  const classes = useNewChannelDialogStyles();
  const menuClasses = useSettingDialogStyles();
  const buttonClasses = useDisButtonStyles();
  const menuClass = classNames({
    [menuClasses.menuItem]: setting === "Leave Server",
  });

  const {
    app: { server },
  } = useContext(ServerContext);

  console.log(server);
  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorUser(null);
  };

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // click handler for confirm button
  const handleConfirm = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(server.invite_code);
  };

  return (
    <>
      <MenuItem className={menuClass} onClick={handleClickOpen}>
        {setting}
        <Button onClick={handleCopy}>
          <ContentCopyIcon />
        </Button>
        <Button onClick={handleCopy}>
          <ContentCopyIcon />
        </Button>
      </MenuItem>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        {setting === "Leave Server" ? (
          <>
            <DialogTitle>{`Are you sure you want to leave server?`}</DialogTitle>
            <DialogActions>
              <Button className={buttonClasses.cancel} onClick={handleClose}>
                Cancel
              </Button>
              <Button className={buttonClasses.submit} onClick={handleConfirm}>
                Confirm
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle
            // sx={{
            //   color: `#f5f5f5`,
            //   backgroundColor: `transparent`,
            //   filter: `blur(5px)`,
            //   transition: `.5s`,
            //   transitionDelay: `.5s`,
            //   webkitFilter: `blur(5px)`,
            //   cursor: `pointer`,
            // }}
            >
              Invite code
            </DialogTitle>
            <DialogActions></DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

// sx={{
//   color: `#f5f5f5`,
//   backgroundColor: `transparent`,
//   filter: `blur(5px)`,
//   transition: `.5s`,
//   transitionDelay: `.5s`,
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
