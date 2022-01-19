import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { makeStyles } from "@mui/styles";
import { IconButton, Menu, Box, MenuItem } from "@mui/material";
import ConfirmationDialogue from "./ConfirmationDialogue";

// styles
const useStyles = makeStyles(() => ({
  contained: {
    listButton: "black",
    borderRadius: ".8em",
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: "inherit",
    },
    left: "1em",
  },
  icon: {
    backgroundColor: "inherit",
    height: "2em",
    width: "2em",
    "&:hover": {
      color: "rgb(204, 180, 180, 1)",
      backgroundColor: "inherit",
    },
  },
  menuItem: {
    padding: "0px",
    margin: "0",
  },
}));

export default function ElipsesDropdown(props) {
  const classes = useStyles();

  const [anchorElUser, setAnchorElUser] = useState(false);
  const { friend, setFriend } = props;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        className={classes.icon}
        onClick={handleOpenUserMenu}
        disableRipple={true}
        disableFocusRipple
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>

      <Menu
        sx={{ marginLeft: "1em", mt: "1em", padding: "0px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem className={classes.menuItem}>
          <ConfirmationDialogue
            action="Remove Friend"
            setFriend={setFriend}
            friend={friend}
            setAnchorElUser={setAnchorElUser}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}
