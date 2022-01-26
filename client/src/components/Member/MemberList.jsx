import { useContext, useState } from "react";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Drawer,
  Grid,
  ListItem,
  ListItemButton,
  List,
  Typography,
  Divider,
} from "@mui/material";
import { useMemberListStyles } from "../styles/useMemberListStyles";
import ServerContext from "../../contexts/ServerContext";
import MemberListItem from "./MemberListItem";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import GroupsIcon from "@mui/icons-material/Groups";

const useStyles = makeStyles({
  members: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      borderRadius: "30px",
      width: "2px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0.3)",
      borderRadius: "30px",
    },
  },
  button: {
    // justifyContent: "space-around",
    cursor: "pointer",
    opacity: "0.7",
    "&:hover": {
      opacity: "1.0",
    },
  },
  role: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1em",
  },
  divider: {
    width: "85%",
    margin: "auto auto",
  },
});

export default function MemberList(props) {
  const drawerClasses = useMemberListStyles();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const {
    app: { members },
  } = useContext(ServerContext);
  const drawerClass = classNames(drawerClasses.drawer, {
    [drawerClasses.drawerOpen]: open,
  });

  const openDrawer = () => {
    // socket.emit("get online");
    setOpen(true);
  };
  const closeDrawner = () => {
    setOpen(false);
  };

  // TODO: refactor this mess (when in the mood)
  const admins = members
    .filter((member) => member.role === "admin")
    .map((member) => {
      return (
        <MemberListItem
          key={member.id}
          member={member}
          open={open}
          setOpen={setOpen}
        />
      );
    });
  const users = members
    .filter((member) => member.role === "user")
    .map((member) => {
      return (
        <MemberListItem
          key={member.id}
          member={member}
          open={open}
          setOpen={setOpen}
        />
      );
    });
  const owner = members
    .filter((member) => member.role === "owner")
    .map((member) => {
      return (
        <MemberListItem
          key={member.id}
          member={member}
          open={open}
          setOpen={setOpen}
        />
      );
    });

  return (
    // <Grid sx={1} className={classes.members}>
    <Drawer
      className={drawerClass}
      variant="permanent"
      anchor="right"
      open={open}
      // sx={{ width: "100%" }}
    >
      <List className={classes.members}>
        <ListItem
          className={classes.button}
          onClick={open ? closeDrawner : openDrawer}
        >
          <GroupsIcon fontSize="large" />
          {open ? <ChevronRight /> : <ChevronLeft />}
        </ListItem>
        {owner.length > 0 && (
          <>
            <Typography
              className={classes.role}
              variant="button"
              sx={{ color: "rgb(199, 58, 58,1)" }}
            >
              owner
            </Typography>
            <Divider component="li" className={classes.divider} />
          </>
        )}
        {owner}
        {admins.length > 0 && (
          <>
            <Typography
              className={classes.role}
              variant="button"
              sx={{ color: "orange" }}
            >
              admins
            </Typography>
            <Divider component="li" className={classes.divider} />
          </>
        )}
        {admins}
        {users.length > 0 && (
          <>
            <Typography
              className={classes.role}
              variant="button"
              sx={{ color: "green" }}
            >
              users
            </Typography>
            <Divider component="li" className={classes.divider} />
          </>
        )}
        {users}
      </List>
      {/* </Grid> */}
    </Drawer>
  );
}
