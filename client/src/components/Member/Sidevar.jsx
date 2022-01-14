import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TableFooter } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import ElipsesDropdown from "../ElipsesDropDown";
import { theme } from "../../themes/appTheme";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const drawerWidth = "600px";

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
    width: `calc(${theme.spacing(20)} + 1px)`,
  },
});

const UserList = styled("div")(({ theme }) => ({
  width: drawerWidth,
  height: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-bewteen",
  alignContent: "center",
  marginLeft: "40px",
}));

const User = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
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
export default function Sidevar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}>
      <CssBaseline />

      <Drawer variant="permanent" anchor="right" open={open}>
        <Divider />
        <Box
          sx={{
            textAlign: "center",
            borderBottom: "1px solid white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "0",
            marginBottom: "5px",
          }}>
          <Typography>Owner</Typography>
        </Box>

        <UserList onClick={handleDrawerOpen}>
          <Typography>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </StyledBadge>{" "}
            {!open && <ListItemText primary={"Hyunsu"} />}
          </Typography>
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "end",
              left: "400px",
            }}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
        </UserList>

        <Box
          sx={{
            textAlign: "center",
            borderBottom: "1px solid white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "20px",
            marginBottom: "5px",
          }}>
          <Typography>Admin</Typography>
        </Box>
        <UserList onClick={handleDrawerOpen}>
          <Typography>
            <User alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            {!open && <ListItemText primary={"Adam"} />}
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "end",
                left: "400px",
              }}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </IconButton>
          </Typography>
        </UserList>

        <Box
          sx={{
            textAlign: "center",
            borderBottom: "1px solid white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "20px",
            marginBottom: "5px",
          }}>
          <Typography>Mod</Typography>
        </Box>
        <UserList onClick={handleDrawerOpen}>
          <Typography>
            <User alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            {!open && <ListItemText primary={"Jono"} />}
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "end",
                left: "400px",
              }}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </IconButton>
          </Typography>
        </UserList>

        <Box
          sx={{
            textAlign: "center",
            borderBottom: "1px solid white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "20px",
            marginBottom: "5px",
          }}>
          <Typography>Online</Typography>
        </Box>
        <UserList onClick={handleDrawerOpen}>
          <Typography>
            <User alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            {!open && <ListItemText primary={"Ted"} />}
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "end",
                left: "400px",
              }}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </IconButton>
          </Typography>
        </UserList>
        <Divider />
        <TableFooter
          sx={{
            position: "fixed",
            marginLeft: "10px",
            bottom: 0,
          }}>
          <IconButton>
            {open && <ChevronRightIcon onClick={handleDrawerClose} />}
          </IconButton>
        </TableFooter>
      </Drawer>
    </Box>
  );
}

// <StyledEngineProvider injectFirst>
// <ThemeProvider theme={theme}>
//   <ElipsesDropdown />
// </ThemeProvider>
// </StyledEngineProvider>
