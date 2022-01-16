import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ServerListItem from "./ServerListItem";
import NewServerDialog from "./NewServerDialog";
import { useServerListStyles } from "../styles/useServerListStyles";
import ServerContext from "../../contexts/ServerContext";

export default function ServerList(props) {
  const classes = useServerListStyles();
  const { socket, user, children } = props;

  const {
    app: { servers },
    setServer,
  } = useContext(ServerContext);

  const parsedServers = servers.map((server) => {
    return (
      <ServerListItem
        key={server.id}
        server={server.id}
        id={server.id}
        title={server.title}
        logo={server.logo}
        setServer={setServer}
      />
    );
  });

  // experimenting adding server
  const addServer = (title) => {
    // console.log(parsedServers);
    // let image =
    //   "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86";
    // setState((prev) => {
    //   const id = Math.random() * 100;
    //   return {
    //     ...prev,
    //     servers: {
    //       ...prev.servers,
    //       [id]: { title, image, id },
    //     },
    //   };
    // });
  };

  const handleHomeClick = (socket) => {
    socket.emit("home click", socket.id, user.display_name);
  };

  useEffect(() => {
    socket?.emit("connection", socket.id, user.display_name);
  }, []);

  return (
    <Box className={classes.box}>
      <CssBaseline />
      <Drawer className={classes.serverList} variant="permanent" anchor="left">
        <IconButton title="Home" onClick={() => handleHomeClick(socket)}>
          <img alt="Home" src="/images/Disnode-red.png" width="70px" />
        </IconButton>
        <Divider className={classes.divider} />
        <Box ml={"auto"} mr={"auto"}>
          <List>{parsedServers}</List>
        </Box>
        <Divider />
        <Box ml={"auto"} mr={"auto"}>
          <NewServerDialog onClick={addServer} />
        </Box>
      </Drawer>
      {children}
    </Box>
  );
}
