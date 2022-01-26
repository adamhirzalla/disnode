import AuthContext from "../contexts/AuthContext";
import Home from "../components/Home";
import { HOME, SERVER, SET_SOCKET } from "../utils/constants";
import { useContext, useEffect } from "react";
import ServerContext from "../contexts/ServerContext";
import ServerList from "../components/Server/ServerList";
import Server from "../components/Server";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "space-between",
    width: `calc(100vw - 90px)`,
    height: "100vh",
    position: "absolute",
    left: "90px",
    top: "0",
    overflowX: "hidden",
    backgroundColor: "rgb(125, 116, 115,0.5)",
  },
  server: { display: "flex", maxHeight: "100vh" },
});
export default function Dashboard() {
  const {
    state: { loading, user },
    dispatch,
  } = useContext(AuthContext);
  const {
    app: { mode },
    appDispatch,
  } = useContext(ServerContext);
  const classes = useStyles();

  return (
    <>
      <ServerList />
      <Box className={classes.main}>
        {!user && mode === "LOGIN" && <Login />}
        {mode === "REGISTER" && <Register />}
        {!loading && user && (
          <>
            {mode === HOME && <Home />}
            {mode === SERVER && <Server className={classes.server} />}
          </>
        )}
      </Box>
    </>
  );
}
