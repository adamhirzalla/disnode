import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServerList from "../components/Server/ServerList";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";
import ServerContext from "../contexts/ServerContext";
import sio from "../socket/index";
import FriendsList from "../components/Friends/FriendsList";
import { Box } from "@mui/system";

// styles
import { useHomePageStyles } from "../components/styles/useHomePageStyles";
import FriendProfile from "../components/Friends/FriendProfile";
import DisBox from "../components/Box/DisBox";

const friendList = [
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/male-avatar-img.png",
    is_active: true,
    username: "Learth",
    bio: "Hi, we are disnode!",
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/male-avatar-img.png",
    is_active: true,
    username: "smart lad",
    bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
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
    is_active: false,
  },
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/male-avatar-img.png",
    is_active: false,
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/male-avatar-img.png",
    is_active: false,
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/male-avatar-img.png",
    is_active: false,
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
    <DisBox type="homeWrapper">
      <ServerList
        className={classes.root}
        servers={app.servers}
        socket={socket.current}
        user={state.user}
        setServer={setServer}
      >
        <DisBox>
          <div className={classes.rowTwo}>
            <FriendsList friendList={friendList} />
          </div>
          <DisBox type="friendProfileWrapper">
            <FriendProfile user={friendList[1]} />
          </DisBox>
        </DisBox>
      </ServerList>
    </DisBox>
  );
}
