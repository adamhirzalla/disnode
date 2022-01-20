import { IconButton, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import ServerMenuListItem from "./ServerMenuListItem";

export default function SettingServerMenu({ option, setOption }) {
  const [anchor, setAnchor] = useState(false);

  const handleClose = () => {
    setAnchor(false);
  };

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <KeyboardArrowDownIcon sx={{ color: "white" }} />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <ServerMenuListItem
          option={option}
          setOption={setOption}
          handleClose={handleClose}
        />
      </Menu>
    </>
  );
}
