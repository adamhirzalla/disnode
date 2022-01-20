import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import { useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ServerContext from "../../contexts/ServerContext";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

import { Typography, Toolbar, Divider } from "@mui/material";
import DMListItem from "./DMListItem";

// styles
const drawerWidth = 500;
const useStyles = makeStyles(() => ({
  header: { color: "#FFF" },
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
      zIndex: 0,
      borderRight: "0",
      "&::-webkit-scrollbar": {
        width: "0",
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
    justifyContent: "center",
    backgroundColor: "black",
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

const mockDMChannels = [
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
  {
    id: 1,

    user: {
      id: 1,
      full_name: "HyunSu Kim",
      img: "/images/avatar2.jpg",
      is_active: true,
      username: "Learth",
      bio: "Hi, we are disnode!",
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      full_name: "Jonathan Su",
      img: "/images/avatar.jpg",
      is_active: true,
      username: "smart lad",
      bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      full_name: "Adam Hirzalla",
      img: "/images/avatar3.jpg",
      is_active: true,
    },
  },
];

export default function DMList({ children }) {
  const classes = useStyles();

  const {
    app: { DMchannels, DMchannel },
    setDMChannel,
  } = useContext(ServerContext);

  const parsedDMs = mockDMChannels.map((dm) => {
    return (
      <DMListItem
        key={dm.id}
        id={dm.id}
        user={dm.user}
        DMchannel={DMchannel}
        setDMChannel={setDMChannel}
      />
    );
  });
  return (
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

        <List className={classes.list}>
          {/* <Divider /> */}
          {parsedDMs}
        </List>
      </Drawer>
      {children}
    </Box>
  );
}
