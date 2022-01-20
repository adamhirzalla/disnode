import DisBox from "../Box/DisBox";
import DisImg from "../Image/DisImg";
import uploadtoS3 from "../../utils/s3";
import DisDrawer from "../Drawer/DisDrawer";
import ServerListItem from "./ServerListItem";
import { useContext } from "react";
import NewServerDialog from "./NewServerDialog";
import DisDivider from "../Divider/DisDivider";
import ServerContext from "../../contexts/ServerContext";
import SearchServerDialog from "./SearchServerDialog";
import { List, IconButton, Tooltip, ListItem, Avatar } from "@mui/material";
import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";
import {
  createServer,
  createTags,
  getServer,
  getServers,
} from "../../network/serverApi";
import { HOME } from "../../utils/constants";
import classNames from "classnames";
import { useServerListItemStyles } from "../styles/useServerListItemStyles";
import { makeStyles } from "@mui/styles";
import FriendsListDrawer from "../Friends/FriendsListDrawer";

const useStyles = makeStyles(() => ({
  navHome: {
    position: "sticky",
    top: "-8px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
  },
  navCreate: {
    justifyContent: "center",
    position: "sticky",
    bottom: "48px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
  },
  navSearch: {
    justifyContent: "center",
    position: "sticky",
    bottom: "-5px",
    zIndex: 1300,
  },
}));

export default function ServerList(props) {
  const { socket, user, children } = props;

  const {
    app: { servers, mode, loading },
    setServer,
    setServers,
    setMode,
  } = useContext(ServerContext);

  const parsedServers = servers.map((server) => {
    return (
      <ServerListItem
        key={server.id}
        id={server.id}
        title={server.title}
        logo={server.logo}
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
    setMode(HOME);
  };

  // useEffect(() => {
  //   socket?.emit("connection", socket.id, user.display_name);
  // }, []);
  const iconClasses = useDisIconButtonStyles();
  const classes = useStyles();
  const homeIconClass = classNames(iconClasses.home, {
    [iconClasses.selected]: mode === HOME,
  });
  return (
    <DisBox disStyle="navBox">
      {/* <CssBaseline /> */}
      <DisDrawer disStyle="nav" variant="permanent" anchor="left">
        <List>
          <Tooltip
            title={"Home"}
            arrow
            placement="right"
            className={classes.navHome}
          >
            <ListItem>
              <IconButton
                className={homeIconClass}
                onClick={() => handleHomeClick(socket)}
              >
                <Avatar
                  style={{
                    width: "68px",
                    height: "68px",
                  }}
                  src="/images/Disnode-red.png"
                />
              </IconButton>
            </ListItem>
          </Tooltip>

          <DisDivider disStyle="nav-top" />
          {parsedServers}

          {!loading && (
            <>
              <DisDivider disStyle="nav-bot" />
              <ListItem className={classes.navCreate}>
                <NewServerDialog onClick={handleCreate} />
              </ListItem>
              <ListItem className={classes.navSearch}>
                <SearchServerDialog />
              </ListItem>
            </>
          )}
        </List>
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
