import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";
import { useServerListItemStyles } from "../styles/useServerListItemStyles";
import { Avatar, Tooltip } from "@mui/material";
import { getServer } from "../../network/serverApi";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";
import {
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  SERVER,
  SERVER_JOIN,
  SERVER_LEAVE,
} from "../../utils/constants";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  default: {
    opacity: "0.5",
    "&:hover": { opacity: "1" },
  },
  selected: {
    boxShadow: "inset 0px 0px 0px 2px gray",
    opacity: "1",
  },
  center: {
    justifyContent: "center",
    // padding: "0px auto",
  },
});

export default function ServerListItem(props) {
  const classes = useStyles();
  const { id, title, logo } = props;
  const { app, setServer, setMode } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);
  const { server, mode } = app;
  const listItemClass = classNames(classes.default, {
    [classes.selected]: id === server?.id && mode === SERVER,
  });

  // useEffect(() => {
  //   if (socket) {
  //     const receiveChannelMSG = (message) => {
  //       setMessages(message)
  //     };
  //     socket.on("channel message", receiveChannelMSG);
  //     // console.log("Channel Messages listener added:", new Date());
  //   }
  //   return () => {
  //     // socket.removeAllListeners("channel message", receiveChannelMSG);
  //     socket.off("channel message", receiveChannelMSG);
  //     console.log("Channel Messages listener removed");
  //   };
  // }, [socket, server]);

  const handleServerClick = async () => {
    try {
      const server = await getServer(id);
      if (app.server) socket.emit(SERVER_LEAVE, app.server.id);
      if (app.channel) socket.emit(CHANNEL_LEAVE, app.channel.id);
      const channels = Object.values(server?.channels);
      socket.emit(SERVER_JOIN, server.id);
      socket.emit(CHANNEL_JOIN, {
        id: channels[0]?.id,
        server_id: server.id,
      });
      setServer(server);
      setMode(SERVER);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Tooltip title={title ? title : "unnamed"} arrow placement="right">
      <ListItem className={classes.center}>
        <IconButton className={listItemClass} onClick={handleServerClick}>
          <Avatar
            style={{
              width: "60px",
              height: "60px",
            }}
            src={logo}
          />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
}
