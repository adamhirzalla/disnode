import { React, useState } from "react";
import Popover from "@mui/material/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { IconButton, Button, ListItemButton, ListItem } from "@mui/material";
import ConfirmationDialogue from "./ConfirmationDialogue";

import { useElipsesDropDownStyles } from "./styles/useElipsesDropDownStyles";

export default function ElipsesDropdown() {
  const classes = useElipsesDropDownStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "options-popover" : undefined;

  return (
    <>
      <ListItemButton
        disableRipple="true"
        className={classes.contained}
        onClick={handleClick}
      >
        <IconButton disableRipple className={classes.icon}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </ListItemButton>

      <Popover
        className={classes.popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ConfirmationDialogue action="Remove Friend" friendName="Jason" />
      </Popover>
    </>
  );
}
