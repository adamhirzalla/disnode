import AuthContext from "../contexts/AuthContext";
import Home from "../components/Home";
import { HOME, SERVER } from "../utils/constants";
import { useContext, useEffect } from "react";
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
  const { app, setMessages } = useContext(ServerContext);
  const classes = useStyles();

  useEffect(async () => {
    if (state.socket && state.authenticated) {
      state.socket.on("channel message", async (message) => {
        // const messages = await getMessages();
        // if (channel.id !== message.channel_id) return;
        // const channels = await getChannels(server.id);

        // get back users online and add them in views
        // do this only if user is sender
        // can also only render views if message is last index
        // on backend -> receive that emit and add users to
        // views db and chip off the msg to clients w views filled
        if (message.server_id === app.server.id) setMessages(message);
        console.log(message);
        // setChannels(channels); // dont use
        // setServer(server);
      });
    }
    // return () => state.socket.offAny();
    return () => state.socket.removeAllListeners();
    // setMembers(members);
  }, [app.socket, app.activeUsers, app.server, app.servers, app.channels]);
  /* sending socket+user as prop just for test purposes */
  return (
    <>
      <ServerList />
      <Box className={classes.main}>
        {
          app?.mode === HOME ? (
            <Home />
          ) : app?.mode === SERVER ? (
            <Server className={classes.server} />
          ) : (
            <></>
          ) /* Skeleton here */
        }
      </Box>
    </>
  );
}
