import { useState } from "react";
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

const drawerWidth = 510;

// styles
const useStyles = makeStyles(() => ({
  drawerWrapper: {
    display: "flex",

    width: "100%",
    height: "100%",
  },
  friendListWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "100%",
    padding: "1em",
  },
  friendListOpenIcon: {
    // marginTop: ".75em",
    // marginLeft: ".8em",
    position: "fixed",
    top: ".685em",
    height: "2em",
    width: "2em",
    zIndex: 3,
    color: "#FFF",
    opacity: "0.8",
    "&:hover": {
      // color: "rgb(204, 180, 180, 1)",
      // backgroundColor: "inherit",
      opacity: "1",
    },
  },
  friendListCloseIcon: {
    position: "fixed",
    left: "27em",
    top: "20px",
    width: "2em",
    height: "2em",
    backgroundColor: "rgb(150, 5, 5, 1)",
    color: "#FFF",

    "&:hover": {
      color: "#01040D",
    },
  },
  peopleAltIcon: {
    height: "1.3em",
    width: "1.3em",
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default function FriendsListDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.drawerWrapper}>
      <CssBaseline />
      <IconButton
        className={classes.friendListOpenIcon}
        disableFocusRipple
        color="inherit"
        aria-label="open drawer"
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        edge="start"
        sx={{ ml: 1 }}
      >
        <PeopleAltIcon sx={{ fontSize: 30 }} />
        {open ? <ChevronLeft /> : <ChevronRight />}
        {/* <PeopleAltIcon className={classes.peopleAltIcon} />
        <ChevronRight /> */}
      </IconButton>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            overflowX: "hidden",
            boxSizing: "border-box",
            left: "122px",
            "&::-webkit-scrollbar": {
              width: "0em",
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
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            height: "100%",
            padding: "5em 0em",
          }}
        >
          {/* <IconButton
            className={classes.friendListCloseIcon}
            onClick={handleDrawerClose}
            disableFocusRipple
          >
            <ChevronLeftIcon />
          </IconButton> */}
          <FriendList />
        </Box>
      </Drawer>

      <Main open={open}> {props.children}</Main>
    </Box>
  );
}
