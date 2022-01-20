import { useContext, useState } from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import ContentCopy from "@mui/icons-material/ContentCopy";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SettingDialog from "./SettingDialog";

export default function ServerMenu({ handleClose }) {
  const [open, setOpen] = useState(false);
  // const [option, setOption] = useState(null);
  const {
    app: { server },
  } = useContext(ServerContext);

  const handleClick = (e) => {
    // setOption(e.target.textContent);
    setOpen(true);
    handleClose();
  };

  const handleClipboard = (e) => {
    // setOption(e.target.textContent);
    navigator.clipboard.writeText(server.invite_code);
    handleClose();
  };

  return (
    <Paper sx={{ width: "100%", maxWidth: "100%" }}>
      <MenuList>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd color="success" fontSize="small" />
          </ListItemIcon>
          Add members
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClipboard}>
          <ListItemIcon>
            <ContentCopy color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy invite code</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Logout color="error" fontSize="small" />
          </ListItemIcon>
          Leave
        </MenuItem>
      </MenuList>
      <SettingDialog open={open} setOpen={setOpen} />
    </Paper>
  );
}
