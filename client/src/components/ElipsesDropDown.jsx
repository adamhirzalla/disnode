import * as React from "react";
import Popover from "@mui/material/Popover";

import Button from "@mui/material/Button";
import ConfirmationDialogue from "./ConfirmationDialogue";

export default function ElipsesDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button onClick={handleClick}>Open</Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ConfirmationDialogue />
        <ConfirmationDialogue />
        <ConfirmationDialogue />
      </Popover>
    </div>
  );
}
