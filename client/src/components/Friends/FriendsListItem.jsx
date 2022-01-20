import { useState } from "react";
import { styled } from "@mui/material/styles";
import ElipsesDropdown from "./ElipsesDropDown";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Button,
  Dialog,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FriendProfile from "./FriendProfile";

// styles
const useStyles = makeStyles(() => ({
  avatar: {
    width: "3em",
    height: "3em",
  },
  list: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "5em",
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
  listItem: {
    "&:hover": {
      borderRadius: ".5em",
    },
  },
  addButton: {
    color: "black",
    backgroundColor: "inherit",
    "&:hover": {
      color: "gray",
      backgroundColor: "inherit",
    },
  },
  root: {
    color: "#FFFFFF",
    "& .MuiInputBase-root": {
      color: "#FFF",
      textAlign: "center",
    },
  },
  content: {
    color: "#FFFFFF",
    padding: "0 0",
  },
  dialogPaper: {
    display: "flex",
    alignItems: "center",
    borderRadius: "2em",
    backgroundColor: "#040B0C",
    color: "#FFFFFF",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  dialogTitle: { padding: "0 0", margin: "0 0" },
  dialog: { padding: "0 0", margin: "0 0" },
  dialogActions: { flexDirection: "row", justifyContent: "center" },
  closeDialog: {
    color: "white",
    borderRadius: ".8em",
    backgroundColor: "#7a211b",
    width: "20%",
    "&:hover": {
      background: "rgb(179, 2, 2, 0.5)",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme, open }) => ({
  display: "flex",
  justifyContent: "center",
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    ...(open ? { left: 30 } : { right: 43 }),
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function FriendsListItem({ setFriend, friend }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setFriend(friend);
  };

  return (
    <ListItem
      className={classes.listItem}
      secondaryAction={
        <ElipsesDropdown friend={friend} setFriend={setFriend} />
      }
      disablePadding
    >
      <ListItemButton className={classes.list} onClick={handleOpen}>
        <ListItemAvatar>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={friend.is_active ? "dot" : "standard"}
            sx={{
              "& .MuiBadge-badge": {
                right: 10,
                width: "1em",
                height: "1em",
                borderRadius: "1em",
              },
            }}
          >
            <Avatar
              alt={friend.name}
              src={friend.img}
              className={classes.avatar}
            />
          </StyledBadge>
        </ListItemAvatar>
        <ListItemText className={classes.text} primary={friend.full_name} />
      </ListItemButton>
      <Dialog
        className={classes.dialog}
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <FriendProfile friend={friend} />
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.closeDialog}
            onClick={() => setOpen(false)}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}
