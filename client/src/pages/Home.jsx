import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServerList from "../components/Server/ServerList";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";
import ServerContext from "../contexts/ServerContext";
import sio from "../socket/index";
import FriendsList from "../components/Friends/FriendsList";
import { Box } from "@mui/system";

const friendList = [
  {
    id: 3,
    name: "HyunSu Kim",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 2,
    name: "Jonathan Su",
    img: "/images/male-avatar-img.png",
  },
  {
    id: 1,
    name: "Adam Hirzalla",
    img: "/images/male-avatar-img.png",
  },
];

export default function Home() {
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
    <div
      style={{
        display: "flex",
      }}
    >
      <ServerList
        servers={app.servers}
        socket={socket.current}
        user={state.user}
        setServer={setServer}
      >
        <Box>
          <FriendsList friendList={friendList} />
        </Box>
        <Box>
          Welcome {state.user.full_name}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </Box>
      </ServerList>
    </div>
  );
}
