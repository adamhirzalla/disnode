import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  IconButton,
  AvatarGroup,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import ConfirmDialog from "./ConfirmDialog";

export default function SearchServerListDialog({ server, openResult }) {
  const { title, logo, members } = server;
  const [open, setOpen] = useState(false);
  const classes = useServerDialogStyles();
  return (
    <>
      {openResult && (
        <>
          <ListItem
            className={classes.listItem}
            sx={{
              "& .MuiListItemButton-root": {
                borderRadius: "2em",
              },
            }}
            disablePadding
          >
            <ListItemButton className={classes.list}>
              <ListItemAvatar>
                <Avatar alt={title} src={logo} className={classes.avatar} />
              </ListItemAvatar>
              <ListItemText
                className={classes.text}
                sx={{ pl: "20px" }}
                primary={server.title}
              />

              <AvatarGroup total={members.length} sx={{ pr: "25px" }}>
                <Avatar alt={members[0].nickname} src={members[0].avatar} />
                <Avatar alt={members[1]?.nickname} src={members[1]?.avatar} />
                <Avatar alt={members[2]?.nickname} src={members[2]?.avatar} />
              </AvatarGroup>

              <IconButton
                onClick={() => setOpen(true)}
                sx={{ color: "green", opacity: 0.6 }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          {open && (
            <ConfirmDialog setOpen={setOpen} open={open} server={server} />
          )}
        </>
      )}
    </>
  );
}
