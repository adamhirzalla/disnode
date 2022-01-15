import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/Help";
import CampaignIcon from "@mui/icons-material/Campaign";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import NewChannelDialog from "./NewChannelDialog";

export default function ChannelList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        ml: "120px",
        borderLeft: "3px solid gray",
        borderRight: "2px solid gray",
        height: "100vh",
        width: "240px",
        position: "absolute",
        top: "0",
        left: "0",
        // bgcolor: "gray"
      }}
    >
      <List
        sx={{ width: "100%", maxWidth: 240 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Channels
          </ListSubheader>
        }
      >
        <ListItemButton>
          <CssBaseline />
          <ListItemIcon>
            <CampaignIcon />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary="Gaming" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LooksTwoIcon />
              </ListItemIcon>
              <ListItemText primary="Duos" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Looks3Icon />
              </ListItemIcon>
              <ListItemText primary="Trios" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>
        <Box ml={"90px"} mr={""}>
          <NewChannelDialog />
        </Box>
      </List>
    </Box>
  );
}
