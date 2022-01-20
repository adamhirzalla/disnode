import { Avatar, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import UserInfoListItem from "./UserInfoListItem";

export default function UserInfoList() {
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
        <Avatar />
      </IconButton>
      <Menu
        sx={{ mt: "5px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <UserInfoListItem handleClose={handleClose} />
      </Menu>
    </>
  );
}
