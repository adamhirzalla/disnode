import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";
import FriendsListDrawer from "./Home/Friends/FriendsListDrawer";
import { Box } from "@mui/system";
import DMList from "./Home/DirectMessage/DMList";
import { makeStyles } from "@mui/styles";
import DMChat from "./Home/DirectMessage/DMChat";
import { messages } from "./Home/mock";

// styles
import { useHomePageStyles } from "../components/styles/useHomePageStyles";
import { useBoxStyles } from "./styles/useBoxStyles";

const useStyles = makeStyles(() => ({
  // chatWrapper: {
  //   display: "flex",
  //   width: "100vw",
  //   height: "100vh",
  // },
}));

export default function Home() {
  const homeClasses = useHomePageStyles();
  const boxClasses = useBoxStyles();
  const classes = useStyles();
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <>
      {/* <Box className={boxClasses.homeWrapper}> */}
      {/* <Box className={boxClasses.root}> */}
      {/* <FriendsListDrawer /> */}
      <DMList />
      <DMChat messages={messages} />
      {/* <Box className={classes.chatWrapper}></Box> */}
      {/* </Box> */}
      {/* </Box> */}
    </>
  );
}

/* 
  // If user is not logged in, redirect to login
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.authenticated) navigate("/login");
  }, []);
*/
