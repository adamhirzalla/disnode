import { Fragment, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FriendList from "./FriendList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import { friends } from "../mock";
import MessageIcon from "@mui/icons-material/Message";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    zIndex: 0,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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

// const drawerWidth = "25%";

// // styles
// const useStyles = makeStyles(() => ({
//   drawerWrapper: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "0 0",
//     // width: "25%",
//     // height: "100%",
//   },
//   friendListWrapper: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     height: "100%",
//     padding: "1em",
//   },
//   friendListOpenIcon: {
//     // marginTop: ".75em",
//     // marginLeft: ".8em",
//     position: "fixed",
//     top: ".685em",
//     height: "2em",
//     width: "2em",
//     zIndex: 3,
//     color: "#FFF",
//     opacity: "0.8",
//     "&:hover": {
//       // color: "rgb(204, 180, 180, 1)",
//       // backgroundColor: "inherit",
//       opacity: "1",
//     },
//   },
//   friendListCloseIcon: {
//     position: "fixed",
//     left: "27em",
//     top: "20px",
//     width: "2em",
//     height: "2em",
//     backgroundColor: "rgb(150, 5, 5, 1)",
//     color: "#FFF",

//     "&:hover": {
//       color: "#01040D",
//     },
//   },
//   peopleAltIcon: {
//     height: "1.3em",
//     width: "1.3em",
//   },
// }));

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
//   })
// );

const useStyles = makeStyles(() => ({
  main: {
    width: "0",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      left: "90px",
      // backgroundColor: "rgb(189,189,189,1)",
    },
  },
  button: {
    positon: "absolute",
    zIndex: 1300,
    left: "15px",
    top: "17px",
    color: "rgb(177,55,55)",
    opacity: 0.9,
    "&:hover": {
      opacity: 1,
    },
  },
  listBox: {
    width: "365.141px",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
      display: "hidden",
      borderRadius: "30px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgb(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0)",
      // outline: "1px solid black",
      borderRadius: "30px",
    },
  },
  list: {},
  topListItem: {},
  botListItem: {},
  toolbar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#040B0C",
    height: "50px",
    width: "100%",
    padding: "0.5em 0",
    position: "sticky",
    top: "0",
    zIndex: "1",
    borderBottomRightRadius: "7px",
  },
  header: { color: "white" },
  avatar: { width: "45px", height: "45px" },
}));

export default function FriendsListDrawer(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
    // if (
    //   event &&
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    // setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      // role="presentation"
      // onClick={() => setOpen(false)}
      // onKeyDown={() => setOpen(false)}
      className={classes.listBox}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className={classes.header}
        >
          Friends
        </Typography>
      </Toolbar>
      <List className={classes.list}>
        {friends.map((friend, i) => (
          <ListItem button key={i} className={classes.topListItem}>
            <ListItemAvatar>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant={friend.is_active ? "dot" : "standard"}
                // onClick={handleAnchor}
              >
                <Avatar
                  alt={friend.full_name}
                  src={"/images/avatar2.jpg"}
                  className={classes.avatar}
                />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText primary={friend.full_name} />
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className={classes.list}>
        {friends.map((friend, i) => (
          <ListItem button key={i} className={classes.botListItem}>
            <ListItemAvatar>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant={friend.is_active ? "dot" : "standard"}
                // onClick={handleAnchor}
              >
                <Avatar
                  alt={friend.full_name}
                  src={"/images/avatar3.jpg"}
                  className={classes.avatar}
                />
              </StyledBadge>
            </ListItemAvatar>

            <ListItemText primary={friend.full_name} />
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={classes.main}>
      {/* {["left", "right", "top", "bottom"].map((anchor) => ( */}
      <Fragment key={"left"}>
        <IconButton
          aria-label="friends"
          size="large"
          // color="error"
          // onClick={toggleDrawer("left", true)}
          onClick={open ? toggleDrawer : toggleDrawer}
          className={classes.button}
          disableRipple
        >
          <PeopleAlt />
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          // open={state["left"]}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(false)}
          open={open}
          className={classes.drawer}
        >
          {list("left")}
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
}
// return (
// <Box className={classes.drawerWrapper}>
//   <CssBaseline />
//   <IconButton
//     className={classes.friendListOpenIcon}
//     disableFocusRipple
//     color="inherit"
//     aria-label="open drawer"
//     onClick={open ? handleDrawerClose : handleDrawerOpen}
//     edge="start"
//     sx={{ ml: 1 }}
//   >
//     <PeopleAltIcon sx={{ fontSize: 30 }} />
//     {open ? <ChevronLeft /> : <ChevronRight />}
//     {/* <PeopleAltIcon className={classes.peopleAltIcon} />
//     <ChevronRight /> */}
//   </IconButton>

//   <Drawer
//     sx={{
//       // width: drawerWidth,
//       flexShrink: 0,
//       zIndex: 2,

//       "& .MuiDrawer-paper": {
//         width: drawerWidth,
//         overflowX: "hidden",
//         boxSizing: "border-box",
//         left: "122px",
//         "&::-webkit-scrollbar": {
//           width: "0em",
//           borderRadius: "30px",
//         },
//         "&::-webkit-scrollbar-track": {
//           WebkitBoxShadow: "inset 0 0 6px rgb(0,0,0,0)",
//         },
//         "&::-webkit-scrollbar-thumb": {
//           backgroundColor: "rgb(0,0,0,0)",
//           // outline: "1px solid black",
//           borderRadius: "30px",
//         },
//       },
//     }}
//     variant="persistent"
//     anchor="left"
//     open={open}
//   >
//     <Box
//       component="div"
//       sx={{
//         display: "flex",
//         justifyContent: "flex-start",
//         height: "100%",
//         padding: "5em 0em",
//       }}
//     >
//       {/* <IconButton
//         className={classes.friendListCloseIcon}
//         onClick={handleDrawerClose}
//         disableFocusRipple
//       >
//         <ChevronLeftIcon />
//       </IconButton> */}
//       <FriendList />
//     </Box>
//   </Drawer>

//   <Main open={open}> {props.children}</Main>
// </Box>
// );
