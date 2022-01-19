import DisBox from "../Box/DisBox";
import DisImg from "../Image/DisImg";
import uploadtoS3 from "../../utils/s3";
import DisDrawer from "../Drawer/DisDrawer";
import ServerListItem from "./ServerListItem";
import { useContext } from "react";
import NewServerDialog from "./NewServerDialog";
import DisDivider from "../../Divider/DisDivider";
import DisIconButton from "../Button/DisIconButton";
import { List, CssBaseline } from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import {
  createServer,
  createTags,
  getServer,
  getServers,
} from "../../network/serverApi";
import SearchServerDialog from "./SearchServerDialog";

export default function ServerList(props) {
  const { socket, user, children } = props;

  const {
    app: { servers },
    setServer,
    setServers,
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

  const handleCreate = async (input) => {
    const { title, tags, file } = input;
    // we get back an array or urls (to support multiple file upload)
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    const [logo] = await uploadtoS3(formData);
    const { id } = await createServer(title, logo);
    await createTags(tags, id);
    const servers = await getServers();
    const server = await getServer(id);
    setServers(servers);
    setServer(server);
  };

  const handleHomeClick = (socket) => {
    socket.emit("home click", socket.id, user.display_name);
  };

  // useEffect(() => {
  //   socket?.emit("connection", socket.id, user.display_name);
  // }, []);

  return (
    <DisBox type="navBox">
      <CssBaseline />
      <DisDrawer type="nav" variant="permanent" anchor="left">
        <DisIconButton type="home" onClick={() => handleHomeClick(socket)}>
          <DisImg alt="Home" src="/images/Disnode-red.png" type="home" />
        </DisIconButton>
        <DisDivider type="home" />

        <List>{parsedServers}</List>
        <DisDivider />

        <NewServerDialog onClick={handleCreate} />
        <SearchServerDialog />
      </DisDrawer>
      {children}
    </DisBox>
  );
}

//old component

// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import Drawer from "@mui/material/Drawer";
// import Divider from "@mui/material/Divider";
// import { useContext, useEffect } from "react";
// import ServerListItem from "./ServerListItem";
// import NewServerDialog from "./NewServerDialog";
// import IconButton from "@mui/material/IconButton";
// import CssBaseline from "@mui/material/CssBaseline";
// import ServerContext from "../../contexts/ServerContext";
// import { useServerListStyles } from "../styles/useServerListStyles";
// import {
//   createServer,
//   createTags,
//   getServer,
//   getServers,
// } from "../../network/serverApi";

// export default function ServerList(props) {
//   const classes = useServerListStyles();
//   const { socket, user, children } = props;

//   const {
//     app: { servers },
//     setServer,
//     setServers,
//   } = useContext(ServerContext);

//   const parsedServers = servers.map((server) => {
//     return (
//       <ServerListItem
//         key={server.id}
//         server={server.id}
//         id={server.id}
//         title={server.title}
//         logo={server.logo}
//         setServer={setServer}
//       />
//     );
//   });

//   // experimenting adding server
//   const addServer = async (input) => {
//     const { title, tags, logo } = input;
//     const { id } = await createServer(title, logo);
//     const servers = await getServers();
//     const server = await getServer(id);
//     setServers(servers);
//     setServer(server);
//     await createTags(tags, server.id);
//   };

//   const handleHomeClick = (socket) => {
//     socket.emit("home click", socket.id, user.display_name);
//   };

//   useEffect(() => {
//     socket?.emit("connection", socket.id, user.display_name);
//   }, []);

//   return (
//     <Box className={classes.box}>
//       <CssBaseline />
//       <Drawer className={classes.serverList} variant="permanent" anchor="left">
//         <IconButton type="home" onClick={() => handleHomeClick(socket)}>
//           <img alt="Home" src="/images/Disnode-red.png" width="70px" />
//         </IconButton>
//         <Divider className={classes.divider} />
//         <Box ml={"auto"} mr={"auto"}>
//           <List>{parsedServers}</List>
//         </Box>
//         <Divider />
//         <Box ml={"auto"} mr={"auto"}>
//           <NewServerDialog onClick={addServer} />
//         </Box>
//       </Drawer>
//       {children}
//     </Box>
//   );
// }
