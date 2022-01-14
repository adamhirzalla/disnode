import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { NewChannelDialogueUseStyles } from "./styles/NewChannelDialogueUseStyles";
import ContainedButton from "./Button/ContainedButton";

export default function NewChannelDialogue(props) {
  const classes = NewChannelDialogueUseStyles();
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
        disableRipple
        disableFocusRipple
        onClick={handleClickOpen}
      >
        {props.icon}
      </Button>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        fullWidth="true"
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Create Channel</DialogTitle>
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
          <ContainedButton variant="text" onClick={handleClose} name="Cancel" />
          <ContainedButton
            variant="contained"
            onClick={handleClose}
            name="Create"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
