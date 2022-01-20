import { useContext, useState } from "react";
import { Alert, Box, Divider, ListItem, ListItemText } from "@mui/material";
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
    <Box
      sx={{
        height: "65px",
        backgroundColor: "#040B0C",
      }}
    >
      <ListItem button className={classes.listItem} sx={{ height: "100%" }}>
        <ListItemText
          primary={server.title}
          sx={{ fontWeight: "bold", color: "white" }}
        />
        {option === "Copy invite code" && (
          <Alert
            sx={{ position: "fixed", top: "10px", left: "45%", zIndex: 2 }}
            severity="success"
          >{`Copied on your clipboard`}</Alert>
        )}
        <ServerMenuList option={option} setOption={setOption} />
      </ListItem>
    </Box>
  );
}
