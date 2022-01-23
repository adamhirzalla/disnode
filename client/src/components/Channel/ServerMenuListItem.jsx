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
import ServerLeaveDialog from "./ServerLeaveDialog";
import AuthContext from "../../contexts/AuthContext";
import ServerEditDialog from "./ServerEditDialog";

export default function ServerMenuList({ handleClose, option, setOption }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const {
    app: { server, members },
  } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  const role = members?.find((m) => m.user_id === user.id)?.role;

  const handleClick = () => {
    setOpen(true);
    handleClose();
  };

  const handleCopy = (e) => {
    setOption(e.target.textContent);
    // removing alert in 2 secs (successfully copied invite code)
    setTimeout(() => {
      setOption(null);
    }, 2000);
    navigator.clipboard.writeText(server.invite_code);
    handleClose();
  };

  const handleEdit = () => {
    setEdit(true);
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

        {role === "owner" && (
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        )}
        <MenuItem onClick={handleCopy}>
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
      <ServerLeaveDialog open={open} setOpen={setOpen} />
      <ServerEditDialog open={edit} setOpen={setEdit} />
    </Paper>
  );
}
