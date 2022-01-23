import DisBox from "../Box/DisBox";
import uploadtoS3 from "../../utils/s3";
import DisDrawer from "../Drawer/DisDrawer";
import ServerListItem from "./ServerListItem";
import { useContext } from "react";
import NewServerDialog from "./NewServerDialog";
import DisDivider from "../Divider/DisDivider";
import ServerContext from "../../contexts/ServerContext";
import SearchServerDialog from "./SearchServerDialog";
import {
  List,
  IconButton,
  Tooltip,
  ListItem,
  Avatar,
  Box,
  Drawer,
} from "@mui/material";
import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";
import {
  createServer,
  createTags,
  getServer,
  getServers,
} from "../../network/serverApi";
import { HOME } from "../../utils/constants";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import ProfileMenu from "./ProfileMenu";
import AuthContext from "../../contexts/AuthContext";

const useStyles = makeStyles(() => ({
  navHome: {
    position: "sticky",
    top: "0px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "78px",
  },
  navCreate: {
    // justifyContent: "center",
    // position: "sticky",
    // bottom: "56px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "56px",
  },
  navSearch: {
    // justifyContent: "center",
    // position: "sticky",
    // bottom: "0px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "56px",
  },
  navBot: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
    backgroundColor: "#040B0C",
  },
  nav: {
    // position: "relative",
    height: "100vh",
    overflowY: "scroll",
    "& .MuiPaper-root": {
      width: "90px",
      backgroundColor: "#040B0C",
      position: "relative",
      minHeight: "100vh",
    },
  },
  list: {
    width: "100%",
    overflowY: "scroll",
    minHeight: "100vh",
    position: "relative",
    "&::-webkit-scrollbar": {
      borderRadius: "30px",
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0.3)",
      borderRadius: "30px",
    },
  },
  listItem: { padding: "0 0", justifyContent: "center", zIndex: 1300 },
  logo: {
    padding: "0 0",
    justifyContent: "center",
    zIndex: 1300,
    position: "sticky",
    top: "0px",
    backgroundColor: "#040B0C",
  },
}));

export default function ServerList(props) {
  const { children } = props;
  const {
    state: { socket, user },
  } = useContext(AuthContext);
  const {
    app: { servers, mode, loading },
    setServer,
    setServers,
    setMode,
  } = useContext(ServerContext);
  const iconClasses = useDisIconButtonStyles();
  const classes = useStyles();
  const homeIconClass = classNames(iconClasses.home, {
    [iconClasses.selected]: mode === HOME,
  });

  const handleHomeClick = () => {
    socket.emit("home click", socket.id, user.nickname);
    // navigator.clipboard.writeText(`${user.nickname} is stoooopid`);
    setMode(HOME);
  };

  const handleCreate = async (input) => {
    const { title, tags, file } = input;
    // we get back an array or urls (to support multiple file upload)
    const formData = new FormData();
    formData.append("image", file);
    try {
      const [logo] = await uploadtoS3(formData);
      const { id } = await createServer(title, logo);
      await createTags(tags, id);
      const servers = await getServers();
      const server = await getServer(id);
      if (server && servers) {
        setServers(servers);
        setServer(server);
      }
    } catch (e) {
      console.log("Could not create server");
    }
  };

  // useEffect(() => {
  //   socket?.emit("connection", socket.id, user.nickname);
  // }, []);

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

  return (
    // <DisBox disStyle="navBox">
    // <>
    // <DisDrawer disStyle="nav" variant="permanent" anchor="left">
    <Drawer variant="permanent" anchor="left" className={classes.nav}>
      <List className={classes.list}>
        <Tooltip
          title={"Home"}
          arrow
          placement="right"
          // className={classes.navHome}
        >
          <ListItem className={classes.logo}>
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
          <Box className={classes.navBot}>
            <DisDivider disStyle="nav-bot" />
            <ListItem className={classes.listItem}>
              <NewServerDialog onClick={handleCreate} />
              <SearchServerDialog />
            </ListItem>
            <ListItem
              className={classes.listItem}
              // sx={{ position: "absolute" }}
            >
              <ProfileMenu />
            </ListItem>
          </Box>
        )}
      </List>
      {/* {children} */}
      {/* </DisBox> */}
      {/* </> */}
    </Drawer>
  );
}
