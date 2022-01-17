import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { addMembersUseStyles } from "../styles/addMembersUseStyles";

export default function AddMemberModal(props) {
  const classes = addMembersUseStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple={true}
        disablefocusripple
        onClick={handleOpen}
      >
        {props.icon}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.root}>
          <Typography>{props.members}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
