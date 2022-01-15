import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { useServerListStyles } from "../styles/useServerListStyles";
import ServerListItem from "./ServerListItem";
import NewServerDialog from "./NewServerDialog";

const mockState = {
  servers: {
    1: {
      id: 1,
      title: "Apex",
      owner: 1,
      image:
        "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86",
    },
    2: {
      id: 2,
      title: "Val",
      owner: 3,
      image:
        "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86",
    },
  },
  members: {},
  channels: {},
};

export default function ServerList() {
  const classes = useServerListStyles();
  const [state, setState] = useState(mockState);
  const [servers, setServers] = useState({});

  const getServers = (state) => {
    let arr = [];
    for (const server in state.servers) {
      arr.push(state.servers[server]);
    }
    return arr;
  };

  // api call to get servers
  // const gettingServers = () => {
  //   axios.get("/api/servers").then((res) => {
  //     if (res.status === 200) {
  //       setServers(res.data);
  //     }
  //   });
  // };

  // rn this is set to run everytime the page loads but may have to set a dependency
  // useEffect(() => {
  //   gettingServers();
  // }, []);

  // mock servers
  const serversEx = getServers(state);
  const parsedServers = serversEx.map((serverObj) => {
    return <ServerListItem key={serverObj.id} server={serverObj} />;
  });
  // ;

  // experimenting adding server
  const addServer = (title) => {
    console.log(parsedServers);
    let image =
      "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86";
    setState((prev) => {
      const id = Math.random() * 100;
      return {
        ...prev,
        servers: {
          ...prev.servers,
          [id]: { title, image, id },
        },
      };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Drawer className={classes.serverList} variant="permanent" anchor="left">
        <IconButton title="Home" onClick={() => {}}>
          <img alt="Home" src="/images/Disnode-red.png" width="70px" />
        </IconButton>
        <Divider />
        <Box ml={"auto"} mr={"auto"}>
          <List>{parsedServers}</List>
        </Box>
        <Divider />
        <Box ml={"auto"} mr={"auto"}>
          <NewServerDialog onClick={addServer} />
        </Box>
      </Drawer>
    </Box>
  );
}
