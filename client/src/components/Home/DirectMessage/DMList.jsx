import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import { useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ServerContext from "../../../contexts/ServerContext";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { mockDMChannels } from "../mock";

import { Typography, Toolbar, Divider, AppBar } from "@mui/material";
import DMListItem from "./DMListItem";
import DMChat from "./DMChat";
import { dms } from "../mock";

// styles
const drawerWidth = 500;
const useStyles = makeStyles(() => ({
  // dmList: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   "& .MuiDrawer-paper": {
  //     marginLeft: "122px",
  //     width: drawerWidth,
  //     boxSizing: "border-box",
  //     display: "flex",
  //     alignItems: "center",
  //     flexDirection: "column",
  //   },
  //   "& .MuiDrawer-root": {
  //     height: "0",
  //     width: "100%",
  //   },
  // },

  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   "& .MuiDrawer-paper": {
  //     left: "122px",
  //     outline: "122px",
  //     width: drawerWidth,
  //     boxSizing: "border-box",
  //     display: "flex",
  //     height: "100%",
  //     alignItems: "center",
  //     flexDirection: "column",
  //     backgroundColor: "gray",
  //     zIndex: 1,
  //     borderRight: "0",
  //     "&::-webkit-scrollbar": {
  //       display: "none",
  //       borderRadius: "30px",
  //     },
  //     "&::-webkit-scrollbar-track": {
  //       WebkitBoxShadow: "inset 0 0 6px rgb(0,0,0,0)",
  //     },
  //     "&::-webkit-scrollbar-thumb": {
  //       backgroundColor: "rgb(0,0,0,0)",
  //       // outline: "1px solid black",
  //       borderRadius: "30px",
  //     },
  //     overflowX: "hidden",
  //   },
  //   "& .MuiDrawer-root": {
  //     height: "0",
  //     width: "100%",
  //   },
  // },
  // toolbarWrapper: {
  //   height: "100%",
  //   width: "100%",
  //   zIndex: 2,
  //   position: "sticky",
  //   top: "0",
  //   backgroundColor: "#FFF",
  //   borderRadius: "0px 0px 15px 0px",
  // },
  dm: {
    display: "flex",
    flexDirection: "column",
    // position: "fixed",
    // left: "122px",
    backgroundColor: "rgb(189,189,189,0.7)",
    // minWidth: "25%",
    width: "30%",
    maxWidth: "30%",
    height: "100%",
    // maxHeight: "100vh",
    // overflowY: "scroll",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#040B0C",
    // height: "5em",
    width: "100%",
    borderBottomRightRadius: "7px",
    padding: "0.5em 0",
  },
  header: { color: "white" },
  list: {
    paddingTop: "0",
    display: "flex",
    flexDirection: "column",
    // width: "100%",
    // height: "100%",
    margin: "0",
    borderTopRightRadius: "20px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
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
}));

export default function DMList({ children }) {
  const classes = useStyles();
  const [DM, setDM] = useState(null);

  // const {
  //   app: { DMchannels, DMchannel },
  //   setDMChannel,
  // } = useContext(ServerContext);

  const parsedDMs = dms.map((dm, i) => {
    return (
      <DMListItem
        key={i}
        id={dm.id}
        user={dm.user}
        DMchannel={DM}
        setDM={setDM}
      />
    );
  });
  return (
    <Box className={classes.dm}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className={classes.header}
        >
          Direct Messages
        </Typography>
      </Toolbar>
      <List className={classes.list}>{parsedDMs}</List>
      {/* <CssBaseline /> */}
      {/* <Drawer className={classes.drawer} variant="permanent" anchor="left"> */}
      {/* <Box className={classes.toolbarWrapper}> */}
      {/* <AppBar position="fixed"> */}
      {/* <Toolbar className={classes.toolbar}> */}
      {/* <Drawer className={classes.dmList} variant="permanent" anchor="left"> */}
      {/* <Typography className={classes.header} variant="h6"> */}
      {/* Direct Messages */}
      {/* </Typography> */}
      {/* </Drawer> */}
      {/* <List className={classes.list}>{parsedDMs}</List> */}
      {/* <DMChat messages={messages} /> */}
      {/* </Toolbar> */}
      {/* </AppBar> */}
      {/* </Box> */}
      {/* </Drawer> */}
      {/* {DM ? <DMChat /> : null} */}
    </Box>
  );
}
