import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// styles
import { useConfirmationDialogStyles } from "./styles/useConfirmationDialogStyles";
import { useDisButtonStyles } from "./styles/useDisButtonStyles";

export default function ConfirmationDialogue({ action, friendName }) {
  const classes = useConfirmationDialogStyles();
  const buttonClasses = useDisButtonStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.dropDown}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {action}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Removing..."}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {friendName} from your Friends?
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
            onClick={handleClose}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
