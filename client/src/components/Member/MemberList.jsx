import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { Box, IconButton, Drawer } from "@mui/material";
import { useMemberListStyles } from "../styles/useMemberListStyles";
import ServerContext from "../../contexts/ServerContext";
import MemberListItem from "./MemberListItem";
import classNames from "classnames";

export default function MemberList({ socket }) {
  const classes = useMemberListStyles();
  const [open, setOpen] = useState(false);
  const {
    app: { members },
  } = useContext(ServerContext);
  const drawerClass = classNames(classes.drawer, {
    [classes.drawerOpen]: open,
  });

  const handleDrawerOpen = () => {
    socket.emit("get online");
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const memberList = members.map((member) => {
    return (
      <MemberListItem
        key={member.id}
        member={member}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
    );
  });

  return (
    <Box sx={{ position: "sticky" }}>
      <Drawer
        className={drawerClass}
        variant="permanent"
        anchor="right"
        open={open}
      >
        {memberList}
        <IconButton
          className={classes.closeIcon}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        >
          {open ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Drawer>
    </Box>
  );
}
