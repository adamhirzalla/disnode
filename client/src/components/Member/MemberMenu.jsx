import { useContext, useState } from "react";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import Admin from "@mui/icons-material/AdminPanelSettings";

import { makeStyles } from "@mui/styles";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import MemberDialog from "./MemberDialog";
import AuthContext from "../../contexts/AuthContext";
import ServerContext from "../../contexts/ServerContext";

const useStyles = makeStyles(() => ({
  root: { backgroundColor: "white" },
}));
export default function MemberMenu(props) {
  const { anchor, setAnchor, member } = props;
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    app: { members },
  } = useContext(ServerContext);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const classes = useStyles();

  const [PROFILE, ADD, ADMIN, DEMOTE, KICK] = [
    "PROFILE",
    "ADD",
    "ADMIN",
    "DEMOTE",
    "KICK",
  ];

  // tartget a member that user clicks
  const handleAnchor = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleAnchorClose = (e) => {
    setAnchor(false);
  };

  const handleAction = (action) => {
    setOpen(true);
    setAnchor(false);
    setAction(action);
  };

  return (
    <Box>
      {/* <Tooltip title={"Options"}>
        <IconButton onClick={handleAnchor} sx={{ mr: "20px" }}>
          <Settings fontSize="small" />
        </IconButton>
      </Tooltip> */}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchor)}
        onClose={() => setAnchor(false)}
      >
        <MenuList>
          <Divider />
          <MenuItem onClick={() => handleAction(PROFILE)}>
            <ListItemIcon>
              <Person color="info" />
            </ListItemIcon>
            Profile
          </MenuItem>
          {member.user_id !== user.id && (
            <MenuItem onClick={() => handleAction(ADD)}>
              <ListItemIcon>
                <PersonAdd color="success" />
              </ListItemIcon>
              Add Friend
            </MenuItem>
          )}
          {member.role !== "admin" &&
            members.find((m) => m.user_id === user.id).role === "owner" &&
            member.user_id !== user.id && (
              <MenuItem onClick={() => handleAction(ADMIN)}>
                <ListItemIcon>
                  <Admin color="warning" />
                </ListItemIcon>
                Assign Admin
              </MenuItem>
            )}
          {member.role === "admin" &&
            members.find((m) => m.user_id === user.id).role === "owner" &&
            member.user_id !== user.id && (
              <MenuItem onClick={() => handleAction(DEMOTE)}>
                <ListItemIcon>
                  <Admin color="warning" />
                </ListItemIcon>
                Demote To User
              </MenuItem>
            )}
          {(members.find((m) => m.user_id === user.id).role === "owner" ||
            members.find((m) => m.user_id === user.id).role === "admin") &&
            member.user_id !== user.id &&
            member.role !== "owner" && (
              <MenuItem onClick={() => handleAction(KICK)}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                Kick
              </MenuItem>
            )}
        </MenuList>

        {/* DIALOG HERE  */}

        <MemberDialog
          member={member}
          open={open}
          setOpen={setOpen}
          action={action}
        />
      </Menu>
    </Box>
  );
}
