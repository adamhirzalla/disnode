import AuthContext from "../contexts/AuthContext";
import Home from "../components/Home";
import { HOME, SERVER } from "../utils/constants";
import { useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import ServerList from "../components/Server/ServerList";
import Server from "../components/Server";

export default function Dashboard() {
  // const { app, setServer, setChannel } = useServerData();

  const { state } = useContext(AuthContext);
  const {
    app: { mode, loading },
  } = useContext(ServerContext);

  /* sending socket+user as prop just for test purposes */
  return (
    <ServerList socket={state.socket} user={state.user}>
      {
        mode === HOME ? (
          <Home />
        ) : mode === SERVER ? (
          <Server />
        ) : (
          <></>
        ) /* Skeleton here */
      }
    </ServerList>
  );
}
