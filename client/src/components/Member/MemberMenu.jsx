import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Menu, Tooltip } from "@mui/material";
import { useState } from "react";
import MemberDialog from "./MemberDialog";

const settings = ["Add Friend", "Assign Mod", "Assign Admin", "Kick Out"];

export default function MemberMenu({ member }) {
  const [anchorUser, setAnchorUser] = useState(false);

  // tartget a member that user clicks
  const handleClick = (e) => {
    setAnchorUser(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorUser(false);
  };

  return (
    <Box>
      <Tooltip title={`${member.nickname}'s Options`}>
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
        {settings.map((setting, i) => (
          <MemberDialog
            key={i}
            setting={setting}
            member={member}
            setAnchorUser={setAnchorUser}
          />
        ))}
      </Menu>
    </Box>
  );
}
