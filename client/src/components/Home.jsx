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
import MessageForm from "./Channel/Message/MessageForm";
import { Stack } from "@mui/material";
import DMHeader from "./Home/DirectMessage/DMHeader";

const useStyles = makeStyles(() => ({
  // chatWrapper: {
  //   display: "flex",
  //   width: "100vw",
  //   height: "100vh",
  // },
  messages: { justifyContent: "flex-end", width: "75%" },
  form: { justifyContent: "flex-end", width: "100%" },
}));

export default function Home() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <>
      {/* <Box className={boxClasses.homeWrapper}> */}
      {/* <Box className={boxClasses.root}> */}
      <FriendsListDrawer />
      <DMList />
      <Stack className={classes.messages}>
        <DMHeader />
        <DMChat messages={messages} />
        <MessageForm spacing={0} className={classes.form} />
      </Stack>
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
