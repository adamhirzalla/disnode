import { useContext, useState } from "react";
import { Alert, Box, ListItem, ListItemText } from "@mui/material";
import ServerContext from "../../contexts/ServerContext";
import { useChannelListStyles } from "../styles/useChannelListItemStyles";
import ServerMenuList from "./ServerMenuList";

export default function ServerMenu() {
  const {
    app: { server },
  } = useContext(ServerContext);
  const classes = useChannelListStyles();
  const [option, setOption] = useState(null);

  return (
    <Box sx={{ pl: 2, height: "65px" }}>
      <ListItem button className={classes.listItem}>
        <ListItemText primary={server.title} />
        {option === "Copy invite code" && (
          <Alert
            sx={{ position: "fixed", top: "60px", left: "45%", zIndex: 2 }}
            severity="success"
          >{`Copied on your clipboard`}</Alert>
        )}
        <ServerMenuList option={option} setOption={setOption} />
      </ListItem>
    </Box>
  );
}
