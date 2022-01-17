import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "./Button/CustomButton";

export default function ConfirmationDialogue({ action, friendName }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
          <CustomButton variant="text" onClick={handleClose} name="Cancel" />
          <CustomButton
            variant="contained"
            onClick={handleClose}
            name="Confirm"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
