import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FriendList from "./FriendList";

const drawerWidth = 550;

// styles
const useStyles = makeStyles(() => ({
  drawerWrapper: {
    display: "flex",
    overflowX: "hidden",
  },
  friendListWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    height: "100%",
    padding: "1em",
  },
  friendListOpenIcon: {
    "&:hover": {
      color: "rgb(204, 180, 180, 1)",
      backgroundColor: "inherit",
    },
  },
  friendListCloseIcon: {
    "&:hover": {
      color: "rgb(204, 180, 180, 1)",
      backgroundColor: "inherit",
    },
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
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ ml: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginLeft: "122px",
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
            padding: "1em 0em",
          }}
        >
          <IconButton
            className={classes.friendListCloseIcon}
            onClick={handleDrawerClose}
            disableFocusRipple
          >
            <ChevronLeftIcon />
          </IconButton>
          <FriendList />
        </Box>
      </Drawer>

      <Main open={open}>{props.children}</Main>
    </Box>
  );
}