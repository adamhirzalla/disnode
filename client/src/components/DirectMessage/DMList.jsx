import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import { useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ServerContext from "../../contexts/ServerContext";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { mockDMChannels } from "./mock";

import { Typography, Toolbar, Divider } from "@mui/material";
import DMListItem from "./DMListItem";
import DMChat from "./DMChat";

// styles
const drawerWidth = 500;
const useStyles = makeStyles(() => ({
  header: { color: "#FFF", paddingLeft: "2.5em" },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      left: "122px",
      outline: "122px",
      width: drawerWidth,
      boxSizing: "border-box",
      display: "flex",
      height: "100%",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "gray",
      zIndex: 1,
      borderRight: "0",
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
      overflowX: "hidden",
    },
    "& .MuiDrawer-root": {
      height: "0",
      width: "100%",
    },
  },
  list: {
    paddingTop: "0",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#040B0C",

    height: "5em",
    width: "100%",
    borderRadius: "0px 15px 15px 0px",
  },
  toolbarWrapper: {
    height: "100%",
    width: "100%",
    zIndex: 2,
    position: "sticky",
    top: "0",
    backgroundColor: "#FFF",
    borderRadius: "0px 0px 15px 0px",
  },
}));

const messages = [
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "/images/avatar",
    sender_id: 2,
    body: "hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi ",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "/images/avatar2.jpg",
    sender_id: 3,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "/images/avatar3.jpg",
    sender_id: 1,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "/images/avatar",
    sender_id: 2,
    body: "hi whats up 99! ",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "/images/avatar2.jpg",
    sender_id: 3,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "/images/avatar3.jpg",
    sender_id: 1,
    body: "hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! hi whats up 88! ",
    sent_at: "now",
  },
  {
    id: 1,
    sender_nickname: "smart lad",
    sender_avatar: "/images/avatar",
    sender_id: 2,
    body: "hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99! hi whats up 99!",
    sent_at: "now",
  },
  {
    id: 2,
    sender_nickname: "Hyunsu",
    sender_avatar: "/images/avatar2.jpg",
    sender_id: 3,
    body: "hi whats up 88!",
    sent_at: "now",
  },
  {
    id: 3,
    sender_nickname: "Learth",
    sender_avatar: "/images/avatar3.jpg",
    sender_id: 1,
    body: "hi whats up 88!",
    sent_at: "now",
  },
];

export default function DMList({ children }) {
  const classes = useStyles();
  const [DM, setDM] = useState(null);

  // const {
  //   app: { DMchannels, DMchannel },
  //   setDMChannel,
  // } = useContext(ServerContext);

  const parsedDMs = mockDMChannels.map((dm, i) => {
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
    <>
      <Box>
        <CssBaseline />
        <Drawer className={classes.drawer} variant="permanent" anchor="left">
          <Box className={classes.toolbarWrapper}>
            <Toolbar className={classes.toolbar}>
              <Typography className={classes.header} variant="h6">
                Direct Messages
              </Typography>
            </Toolbar>
          </Box>

          <List className={classes.list}>{parsedDMs}</List>
        </Drawer>
      </Box>
      {/* {DM ? <DMChat /> : null} */}
      <DMChat messages={messages} />
    </>
  );
}
