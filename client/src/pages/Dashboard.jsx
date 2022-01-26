import AuthContext from "../contexts/AuthContext";
import Home from "../components/Home";
import { HOME, SERVER, SET_SOCKET } from "../utils/constants";
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
    overflowX: "hidden",
  },
  server: { display: "flex", height: "100vh" },
});
export default function Dashboard() {
  const {
    state: { loading, user },
    dispatch,
  } = useContext(AuthContext);
  const {
    app: { mode },
    setMessages,
  } = useContext(ServerContext);
  const classes = useStyles();

  // useEffect(() => {
  //   if (state.socket && state.authenticated) {
  //     const test = (message) => {
  //       if (app.server && message.server_id === app.server.id) {
  //         console.log("setmessage");
  //         setMessages(message);
  //       } else {
  //         console.log("msg sent in another server");
  //         console.log(message);
  //       }
  //       // to see if other users can see messages outside of server (notification)
  //       state.socket.on("channel message", test);
  //     };
  //     // const messages = await getMessages();
  //     // if (channel.id !== message.channel_id) return;
  //     // const channels = await getChannels(server.id);

  //     // get back users online and add them in views
  //     // do this only if user is sender
  //     // can also only render views if message is last index
  //     // on backend -> receive that emit and add users to
  //     // views db and chip off the msg to clients w views filled

  //     // if (app.server && message.server_id === app.server.id)
  //     // setChannels(channels); // dont use
  //     // setServer(server);
  //   }
  //   // return () => state.socket.offAny();
  //   return () => {
  //     // state.socket.off("channel message", test);
  //   };
  //   // setMembers(members);
  //   // }, [app.socket, app.activeUsers, app.server, app.servers, app.channels]);
  // }, [state.socket, state.server]);
  /* sending socket+user as prop just for test purposes */
  return (
    <>
      <ServerList />
      {!loading && user && (
        <Box className={classes.main}>
          {mode === HOME && <Home />}
          {mode === SERVER && <Server className={classes.server} />}
        </Box>
      )}
    </>
  );
}
