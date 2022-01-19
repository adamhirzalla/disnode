import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  Button,
} from "@mui/material";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

export default function MemberDialog({ setting, member, setAnchorUser }) {
  const [open, setOpen] = useState(false);
  const classes = useNewChannelDialogStyles();
  const buttonClasses = useDisButtonStyles();

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
    console.log(member.nickname);
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>{setting}</MenuItem>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {`User: ${member.nickname}`}
          <br /> {`Are you sure you want to  ${setting}?`}
        </DialogTitle>
        <DialogActions>
          <Button className={buttonClasses.cancel} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={buttonClasses.submit} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
