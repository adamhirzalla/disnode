import { IconButton, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import ServerMenu from "./ServerMenu";

export default function SettingServerMenu() {
  const [anchorUser, setAnchorUser] = useState(false);

  const handleClose = () => {
    setAnchorUser(false);
  };

  const handleClick = (e) => {
    setAnchorUser(e.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorUser)}
        onClose={handleClose}
      >
        <ServerMenu handleClose={handleClose} />
      </Menu>
    </>
  );
}
