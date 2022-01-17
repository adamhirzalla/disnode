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
import CustomButton from "../components/Button/CustomButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HomeNav from "../components/Navbar/HomeNav";

// styles
import { useHomePageStyles } from "../components/styles/useHomePageStyles";

const friendList = [
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
        <Box sx={{ width: "100%", height: "100%" }}>
          <HomeNav
            full_name={state.user.full_name}
            img="/images/male-avatar-img.png"
          />
          <div className={classes.rowTwo}>
            <FriendsList friendList={friendList} />
          </div>
        </Box>
      </ServerList>
    </div>
  );
}
