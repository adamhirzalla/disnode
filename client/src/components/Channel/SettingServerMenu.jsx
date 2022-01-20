import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import SettingDialog from "./SettingDialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ServerMenu from "./ServerMenu";

const settings = [`Invite Code`, "Leave Server"];

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
        <ServerMenu />
        {/* {settings.map((setting, i) => (
          <SettingDialog
            key={i}
            setting={setting}
            setAnchorUser={setAnchorUser}
          />
        ))} */}
      </Menu>
    </>
  );
}
