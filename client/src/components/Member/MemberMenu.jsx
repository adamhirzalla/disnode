import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import { useState } from "react";
import MemberDialog from "./MemberDialog";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { useNewChannelDialogStyles } from "../styles/useNewChannelDialogStyles";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

const settings = ["Add Friend", "Assign Mod", "Assign Admin", "Kick Out"];

export default function MemberMenu({ member }) {
  const [anchorUser, setAnchorUser] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [action, setAction] = useState("");

  const classes = useNewChannelDialogStyles();
  const buttonClasses = useDisButtonStyles();

  // tartget a member that user clicks
  const handleClick = (e) => {
    setAnchorUser(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorUser(false);
  };
  const handleDialogClose = (e) => {
    setDialog(false);
  };
  const handleDialog = (action) => {
    setDialog(true);
    setAction(action);
  };

  const handleConfirm = () => {
    if (action === "ADD") console.log(`Adding friend ${member.nickname}`);
  };

  return (
    <Box>
      <Tooltip title={member.nickname}>
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
        <MenuList>
          <Divider />
          <MenuItem onClick={() => handleDialog("ADD")}>
            <ListItemIcon>
              <PersonAdd color="success" fontSize="small" />
            </ListItemIcon>
            Add members
          </MenuItem>
          <MenuItem onClick={() => handleDialog("KICK")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <PersonAdd color="success" fontSize="small" />
          </MenuItem>
          <MenuItem onClick={() => handleDialog("PROFILE")}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout color="error" fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuList>
        {/* {settings.map((setting, i) => (
          <MemberDialog
            key={i}
            setting={setting}
            member={member}
            setAnchorUser={setAnchorUser}
          />
        ))} */}
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={dialog}
          onClose={handleDialogClose}
        >
          <DialogTitle>
            {/* {action === "ADD" || "KICK"} */}
            {`member: ${member.nickname}`}
            {`Would you like to ${action}`}
            {action === "ADD" && "would you really like to add him?"}
            {action === "KICK" && "KICK HIM?? CUZ HE CANT COME BACK"}
            {action === "PROFILE" && member.id}
          </DialogTitle>
          <DialogContent>
            {action === "PROFILE" && "HERE IS THIS GUYS BIO!"}
          </DialogContent>

          <DialogActions>
            <Button className={buttonClasses.cancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={buttonClasses.submit} onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </Box>
  );
}
