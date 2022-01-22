import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import {
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { logout } from "../../network/authApi";
import { useContext, useState } from "react";
import UserInfoDialog from "./UserInfoDialog";
import AuthContext from "../../contexts/AuthContext";
import { Person } from "@mui/icons-material";
import MemberDialog from "../Member/MemberDialog";

const PROFILE = "PROFILE";

export default function ProfileMenuItem({ setAnchor, user }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [action, setAction] = useState(false);
  const { dispatch } = useContext(AuthContext);
  // const [icons, setIcons] = useState([]);

  const handleOpen = () => {
    setAction(PROFILE);
    setProfile(true);
    setAnchor(false);
  };

  const handleClick = () => {
    // const icon = await getIcons();
    // setIcons(icon);
    setOpen(true);
    setAnchor(false);

    // handleClose();
  };

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <Paper sx={{ width: "100%", maxWidth: "100%" }}>
      <MenuList>
        <Divider />
        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <Person fontSize="small" color="primary" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout color="error" fontSize="small" />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </MenuList>
      <UserInfoDialog open={open} setOpen={setOpen} />
      <MemberDialog
        open={profile}
        setOpen={setProfile}
        action={action}
        user={user}
      />
    </Paper>
  );
}
