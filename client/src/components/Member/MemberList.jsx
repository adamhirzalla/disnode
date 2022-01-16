import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, IconButton, CssBaseline } from "@mui/material";
import MemberListItem from "./MemberListItem";
import { useMemberListStyles } from "../styles/useMemberListStyles";

const drawerWidth = "250px";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(15)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default function MemberList({ socket, children }) {
  const classes = useMemberListStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    socket.emit("get online");
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ position: "sticky" }}>
        <CssBaseline />
        <Drawer variant="permanent" anchor="right" open={open}>
          <MemberListItem open={open} handleDrawerOpen={handleDrawerOpen} />
          {/* {open && (
            <Box sx={{ position: "fixed", bottom: 0, right: 250 }}>
              <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )} */}
          <DrawerHeader sx={{ position: "fixed", bottom: 0, right: 0 }}>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
        </Drawer>
      </Box>
      {children}
    </>
  );
}
