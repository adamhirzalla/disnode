import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChannelListItem from "./Message/ChannelListItem";

const drawerWidth = 240;

export default function ChannelList({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              marginLeft: "122px",
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* <Toolbar
            sx={{
              height: "86px",
            }}
          /> */}
          <Divider />
          <List>
            <ChannelListItem />
          </List>
          <Divider />
          <List>
            <ChannelListItem />
          </List>
        </Drawer>
        <div>{children}</div>
      </Box>
    </>
  );
}
