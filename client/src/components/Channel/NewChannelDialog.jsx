import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//style
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import CustomButton from "../Button/CustomButton";

export default function NewChannelDialog(props) {
  const classes = useNewChannelDialogStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple={true}
        disablefocusripple
        onClick={handleClickOpen}
      >
        <AddCircleIcon fontSize="small" />
      </Button>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.dialogTitle}>
          Create Channel
        </DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Title"
            InputProps={{
              className: classes.root,
            }}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton variant="text" onClick={handleClose} name="Cancel" />
          <CustomButton
            variant="contained"
            onClick={handleClose}
            name="Create"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
