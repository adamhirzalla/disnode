import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { makeStyles } from "@mui/styles";
import {
  IconButton,
  Menu,
  Tooltip,
  Avatar,
  Button,
  ListItemButton,
  ListItem,
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
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

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { name, key } = props;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Options">
        <IconButton
          className={classes.icon}
          onClick={handleOpenUserMenu}
          disableRipple={true}
          disableFocusRipple
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </Tooltip>
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
        <MenuItem
          className={classes.menuItem}
          key={key}
          onClick={handleCloseNavMenu}
        >
          <ConfirmationDialogue action="Remove Friend" friendName={name} />
        </MenuItem>
      </Menu>
    </Box>
  );
}
