import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServerList from "../components/Server/ServerList";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";
import ServerContext from "../contexts/ServerContext";
import sio from "../socket/index";
import FriendsList from "../components/Friends/FriendsList";
import { Box } from "@mui/system";
import { Typography, Avatar, Icon, IconButton } from "@mui/material";

import HomeNav from "../components/Navbar/HomeNav";
import DisButton from "../components/Button/DisButton";

// styles
import { useHomePageStyles } from "../components/styles/useHomePageStyles";
import DisImg from "../components/Image/DisImg";
import FriendProfile from "../components/Friends/FriendProfile";

const friendList = [
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/male-avatar-img.png",
    is_active: true,
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/male-avatar-img.png",
    is_active: true,
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/male-avatar-img.png",
    is_active: true,
  },
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/male-avatar-img.png",
  },
];

export default function Home() {
  const classes = useHomePageStyles();
  const { state, dispatch } = useContext(AuthContext);

  const socket = useRef();
  const { app, setServer, setChannel } = useContext(ServerContext);

  // If user is not logged in, redirect to login
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.authenticated) navigate("/login");
  }, []);

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <div className={classes.root}>
      <ServerList
        className={classes.root}
        servers={app.servers}
        socket={socket.current}
        user={state.user}
        setServer={setServer}
      >
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
          <div className={classes.rowTwo}>
            <FriendsList friendList={friendList} />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
          >
            <FriendProfile />
          </Box>
        </Box>
      </ServerList>
    </div>
  );
}
