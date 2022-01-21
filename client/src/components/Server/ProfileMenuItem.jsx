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
import { makeStyles } from "@mui/styles";
import { Person } from "@mui/icons-material";
import { getIcons } from "../../network/userApi";

export default function ProfileMenuItem({ handleClose }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [icons, setIcons] = useState([]);

  const handleClick = async () => {
    const icon = await getIcons();
    setIcons(icon);
    setOpen(true);
    handleClose();
  };

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <Paper sx={{ width: "100%", maxWidth: "100%" }}>
      <MenuList>
        <Divider />
        <MenuItem>
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
      <UserInfoDialog open={open} setOpen={setOpen} icons={icons} />
    </Paper>
  );
}
