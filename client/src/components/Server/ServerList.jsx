import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import NewServerIcon from "./NewServerIcon";
import { useState } from "react";

const drawerWidth = "122px";
const mockServers = ["s1", "s2", "s3", "s4"];

export default function ServerList() {
  const [servers, setServers] = useState(mockServers);

  // mock servers
  const parsedServers = servers.map((text, index) => (
    <ListItem key={text}>
      <IconButton title="Add" onClick={() => {}}>
        {index % 2 === 0 ? (
          <img
            src="https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86"
            width="70px"
            alt="Apex"
          />
        ) : (
          <img
            src="https://preview.redd.it/kzndsge5ver41.png?auto=webp&s=8f12dc8a595c52e9b3df9119d09f9e801ff922e3"
            width="70px"
            alt="Valorant"
          />
        )}
      </IconButton>
    </ListItem>
  ));

  // experimenting adding server
  const addServer = (name) => {
    console.log(name);
    setServers((prev) => {
      return [...prev, name];
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <IconButton title="Home" onClick={() => {}}>
          <img alt="Home" src="/images/Disnode-red.png" width="70px" />
        </IconButton>
        <Divider />
        <Box ml={"auto"} mr={"auto"}>
          <List>{parsedServers}</List>
        </Box>
        <Divider />
        <Box ml={"auto"} mr={"auto"}>
          <NewServerIcon onClick={addServer} />
        </Box>
      </Drawer>
    </Box>
  );
}
