import { useContext } from "react";
import { Box, ListItem, ListItemText } from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListItemStyles";
import SettingServerMenu from "./SettingServerMenu";

export default function SettingServer() {
  const {
    app: { server },
  } = useContext(ServerContext);
  const classes = useChannelListStyles();

  return (
    <Box sx={{ pl: 2 }}>
      <ListItem button className={classes.listItem}>
        <ListItemText primary={server.title} />
        <SettingServerMenu />
      </ListItem>
    </Box>
  );
}
