import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServerList from "../components/Server/ServerList";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";
import ServerContext from "../contexts/ServerContext";
import DisBox from "../components/Box/DisBox";
import FriendsListDrawer from "../components/Friends/FriendsListDrawer";

// styles
import { useHomePageStyles } from "../components/styles/useHomePageStyles";

const friendList = [
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: true,
    username: "Learth",
    bio: "Hi, we are disnode!",
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: true,
    username: "smart lad",
    bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: true,
  },
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: true,
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: true,
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 3,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: false,
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: false,
  },
  {
    id: 1,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
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
          <div className={classes.rowTwo}></div>
          <FriendsListDrawer />

          <DisBox type="friendProfileWrapper"></DisBox>
        </DisBox>
      </ServerList>
    </DisBox>
  );
}
