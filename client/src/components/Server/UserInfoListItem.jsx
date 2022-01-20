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

export default function UserInfoListItem({ handleClose }) {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleClick = () => {
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
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Settings fontSize="small" color="primary" />
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
    </Paper>
  );
}
