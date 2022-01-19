import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";
// import DisBox from "../components/Box/DisBox";
import FriendsListDrawer from "../components/Friends/FriendsListDrawer";
import { Box } from "@mui/system";
import FriendProfile from "./Friends/FriendProfile";
import NewServerDialog from "./Server/NewServerDialog";

// styles
import { useHomePageStyles } from "../components/styles/useHomePageStyles";
import { useBoxStyles } from "./styles/useBoxStyles";

const friendList = [
  {
    id: 8,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: true,
    username: "Learth",
    bio: "Hi, we are disnode!",
  },
  {
    id: 9,
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
    id: 2,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: true,
  },
  {
    id: 3,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: true,
  },
  {
    id: 4,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 5,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: false,
  },
  {
    id: 6,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: false,
  },
  {
    id: 7,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
];

export default function Home() {
  const classes = useHomePageStyles();
  const boxClasses = useBoxStyles();
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <Box className={boxClasses.homeWrapper}>
      <Box className={boxClasses.root}>
        <div className={classes.rowTwo}></div>
        <FriendsListDrawer>HELLO</FriendsListDrawer>
        <Box className={boxClasses.friendProfileWrapper}></Box>
      </Box>
    </Box>
  );
}

/* 
  // If user is not logged in, redirect to login
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.authenticated) navigate("/login");
  }, []);
*/
