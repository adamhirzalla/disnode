import AuthContext from "../contexts/AuthContext";
import Home from "../components/Home";
import { HOME, SERVER } from "../utils/constants";
import { useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import ServerList from "../components/Server/ServerList";
import Server from "../components/Server";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "space-between",
    width: `calc(100vw - 90px)`,
    height: "100vh",
    position: "absolute",
    left: "90px",
    top: "0",
  },
  server: { display: "flex", height: "100vh" },
});
export default function Dashboard() {
  const { state } = useContext(AuthContext);
  const {
    app: { mode, loading },
  } = useContext(ServerContext);

  const classes = useStyles();
  /* sending socket+user as prop just for test purposes */
  return (
    <>
      <ServerList socket={state.socket} user={state.user} />
      <Box className={classes.main}>
        {
          mode === HOME ? (
            <Home />
          ) : mode === SERVER ? (
            <Server className={classes.server} />
          ) : (
            <></>
          ) /* Skeleton here */
        }
      </Box>
    </>
  );
}
