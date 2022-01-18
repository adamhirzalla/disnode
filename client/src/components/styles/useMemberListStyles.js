import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = "150px";

// drawer opening transition
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// drawer closing transition
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(15)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(35)} + 1px)`,
  },
});

export const useMemberListStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    },
    drawerOpen: {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    },
    closeIcon: {
      position: "fixed",
      bottom: 20,
      right: 20,
    },
  })
);
