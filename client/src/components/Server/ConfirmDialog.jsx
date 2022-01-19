import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";

export default function ConfirmDialog({ join, setJoin, server }) {
  const buttonClasses = useDisButtonStyles();
  const classes = useServerDialogStyles();

  const handleConfirm = () => {
    console.log(server);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={join}
      onClose={() => setJoin(false)}
    >
      <DialogTitle>{server.title}</DialogTitle>
      <DialogContentText>{`Are you sure you want to Join?`}</DialogContentText>
      <DialogActions>
        <Button className={buttonClasses.cancel} onClick={() => setJoin(false)}>
          Cancel
        </Button>
        <Button className={buttonClasses.submit} onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
