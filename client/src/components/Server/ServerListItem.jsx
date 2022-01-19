import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";
import { useServerListItemStyles } from "../styles/useServerListItemStyles";
import { Avatar, Tooltip } from "@mui/material";
import { getServer } from "../../network/serverApi";
import ServerContext from "../../contexts/ServerContext";
import { SERVER } from "../../utils/constants";

export default function ServerListItem(props) {
  const classes = useServerListItemStyles();
  const { id, title, logo } = props;
  const {
    app: { server, mode },
    setServer,
    setMode,
  } = useContext(ServerContext);
  const listItemClass = classNames(classes.default, {
    [classes.selected]: id === server?.id && mode === SERVER,
  });

  const handleServerClick = async () => {
    const server = await getServer(id);
    setServer(server);
    setMode(SERVER);
  };

  return (
    <Tooltip title={title} arrow placement="right">
      <ListItem className={classes.center} key={id}>
        <IconButton className={listItemClass} onClick={handleServerClick}>
          <Avatar
            style={{
              width: "65px",
              height: "65px",
            }}
            src={logo}
          />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
}
