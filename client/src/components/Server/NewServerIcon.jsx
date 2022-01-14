import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { newServerStyles } from "../styles/newServerStyles";
import ContainedButton from "../Button/ContainedButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function NewServerIcon({ onClick: addServer }) {
  const classes = newServerStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName((prev) => e.target.value);
  };

  const handleAdd = () => {
    setOpen(false);
    addServer(name);
  };
  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple
        disableFocusRipple
        onClick={handleClickOpen}
      >
        <AddCircleIcon fontSize="large" />
      </Button>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Create Server</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Title"
            onChange={handleChange}
            InputProps={{
              className: classes.root,
            }}
          />
        </DialogContent>
        <DialogActions>
          <ContainedButton variant="text" onClick={handleClose} name="Cancel" />
          <ContainedButton
            variant="contained"
            onClick={handleAdd}
            name="Create"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
