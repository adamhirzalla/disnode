import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useConfirmationDialogStyles } from "../styles/useConfirmationDialogStyles";

// styles

export default function ConfirmationDialogue({
  setFriend,
  friend,
  setAnchorElUser,
}) {
  const classes = useConfirmationDialogStyles();
  const buttonClasses = useDisButtonStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorElUser(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setFriend(friend);
  };

  return (
    <div>
      <Button
        className={classes.dropDown}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Remove Friend
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Removing..."}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {friend.full_name} from your
            Friends?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            className={buttonClasses.cancel}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={buttonClasses.submit}
            onClick={handleClick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
