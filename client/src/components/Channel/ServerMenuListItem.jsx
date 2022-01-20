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
import ServerMenuDialog from "./ServerMenuDialog";

export default function ServerMenuList({ handleClose, option, setOption }) {
  const [open, setOpen] = useState(false);
  const {
    app: { server },
  } = useContext(ServerContext);

  const handleClick = (e) => {
    // setOption(e.target.textContent);
    setOpen(true);
    handleClose();
  };

  const handleCopy = (e) => {
    setOption(e.target.textContent);
    setTimeout(() => {
      setOption(null);
    }, 2000);
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
      <ServerMenuDialog
        open={open}
        setOpen={setOpen}
        option={option}
        setOption={setOption}
      />
    </Paper>
  );
}
