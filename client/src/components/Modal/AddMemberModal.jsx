import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { modalUseStyles } from "./modalUseStyles";
import { borderRadius } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
};

export default function AddMemberModal(props) {
  const classes = modalUseStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple
        disableFocusRipple
        onClick={handleOpen}
      >
        {props.icon}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">{props.members}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
