import { useContext } from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListItemStyles";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function ServerMenu() {
  const {
    app: { server },
  } = useContext(ServerContext);
  const classes = useChannelListStyles();

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
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy invite code</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout color="error" fontSize="small" />
          </ListItemIcon>
          Leave
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy invite code</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ExitToAppIcon color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Leave Server</ListItemText>
        </MenuItem> */}
      </MenuList>
    </Paper>
  );
}
