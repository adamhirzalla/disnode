import DisBox from "../Box/DisBox";
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
import { makeStyles } from "@mui/styles";
import ProfileMenu from "./ProfileMenu";

const useStyles = makeStyles(() => ({
  navHome: {
    position: "sticky",
    top: "0px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "78px",
  },
  navCreate: {
    justifyContent: "center",
    position: "sticky",
    bottom: "56px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "56px",
  },
  navSearch: {
    justifyContent: "center",
    position: "sticky",
    bottom: "0px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "56px",
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
  const iconClasses = useDisIconButtonStyles();
  const classes = useStyles();
  const homeIconClass = classNames(iconClasses.home, {
    [iconClasses.selected]: mode === HOME,
  });

  const handleHomeClick = (socket) => {
    socket.emit("home click", socket.id, user.nickname);
    navigator.clipboard.writeText(`${user.nickname} is stoooopid`);
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
    <DisBox disStyle="navBox">
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
                <SearchServerDialog />
              </ListItem>
              <ListItem
                className={classes.navCreate}
                sx={{ position: "absolute" }}
              >
                <ProfileMenu />
              </ListItem>
            </>
          )}
        </List>
      </DisDrawer>
      {children}
    </DisBox>
  );
}
