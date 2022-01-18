import { useState } from "react";
import { Dialog, DialogActions, DialogTitle, MenuItem } from "@mui/material";
import ContainedButton from "../Button/CustomButton";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";

export default function MemberDialog({ setting, member, setAnchorUser }) {
  const [open, setOpen] = useState(false);
  const classes = useNewChannelDialogStyles();

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
      <MenuItem key={setting} onClick={handleClickOpen}>
        {setting}
      </MenuItem>
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
          <ContainedButton variant="text" onClick={handleClose} name="Cancel" />
          <ContainedButton
            variant="contained"
            onClick={handleConfirm}
            name="Confirm"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
