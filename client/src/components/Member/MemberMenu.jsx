import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const settings = ["Add Friend", "Assign Mod", "Assign Admin", "Kick Out"];

export default function MemberMenu({ member }) {
  const [anchorUser, SetAnchorUser] = useState(null);

  const handleClick = (e) => {
    SetAnchorUser(e.currentTarget);
  };

  const handleClose = (e) => {
    SetAnchorUser(null);
  };

  return (
    <Box>
      <Tooltip title={member.nickname + "'s Info"}>
        <IconButton onClick={handleClick} sx={{ mr: "20px" }}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </Tooltip>
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
        {settings.map((setting) => (
          <MenuItem key={setting}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
