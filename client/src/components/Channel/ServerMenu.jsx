import { useContext, useState } from "react";
import { Alert, Box, ListItem, ListItemText } from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListItemStyles";
import ServerMenuList from "./ServerMenuList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  server: {
    height: "3.6em",
    backgroundColor: "rgb(4,11,12,1)",
  },
  header: { fontWeight: "bold", color: "white" },
  alert: {
    zIndex: 2000,
    position: "fixed",
    left: "50%",
    top: "5%",
    transform: "translate(-50%, -50%)",
  },
});

export default function ServerMenu() {
  const {
    app: { server },
  } = useContext(ServerContext);
  // const classes = useChannelListStyles();
  const classes = useStyles();
  const [option, setOption] = useState(null);

  return (
    <Box className={classes.server}>
      <ListItem button>
        <ListItemText primary={server.title} className={classes.header} />
        {option === "Copy invite code" && (
          <Alert
            className={classes.alert}
            severity="success"
          >{`Invite code copied to clipboard!`}</Alert>
        )}
        <ServerMenuList option={option} setOption={setOption} />
      </ListItem>
    </Box>
  );
}
