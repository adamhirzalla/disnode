import { useContext } from "react";
import { Box, ListItem, ListItemText } from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListItemStyles";
import ServerMenuList from "./ServerMenuList";

export default function ServerMenu() {
  const {
    app: { server },
  } = useContext(ServerContext);
  const classes = useChannelListStyles();

  return (
    <Box sx={{ pl: 2, height: "65px" }}>
      <ListItem button className={classes.listItem}>
        <ListItemText primary={server.title} />
        <ServerMenuList />
      </ListItem>
    </Box>
  );
}
