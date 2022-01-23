import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  IconButton,
  AvatarGroup,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useState } from "react";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import ConfirmDialog from "./ConfirmDialog";
import AuthContext from "../../contexts/AuthContext";
import { addMember } from "../../network/memberApi";
import ServerContext from "../../contexts/ServerContext";
import { getServers } from "../../network/serverApi";

export default function SearchServerListDialog(props) {
  const { server, openResult, setOpenResult } = props;
  const { title, logo, members } = server;
  const [open, setOpen] = useState(false);
  const classes = useServerDialogStyles();
  const {
    state: { user },
  } = useContext(AuthContext);
  const { setMembers, setServers } = useContext(ServerContext);

  const handleJoin = async () => {
    const members = await addMember(server.id, user.id);
    const servers = await getServers();
    setServers(servers);
    setMembers(members);
    setOpenResult(false);
  };

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

              <AvatarGroup total={members.length} sx={{ pr: "80px" }}>
                <Tooltip title={members[0].nickname} arrow placement="top">
                  <Avatar alt={members[0].nickname} src={members[0].avatar} />
                </Tooltip>
                {members[1] && (
                  <Tooltip title={members[1].nickname} arrow placement="top">
                    <Avatar alt={members[1].nickname} src={members[1].avatar} />
                  </Tooltip>
                )}
                {members[2] && (
                  <Tooltip title={members[2].nickname} arrow placement="top">
                    <Avatar alt={members[2].nickname} src={members[2].avatar} />
                  </Tooltip>
                )}
              </AvatarGroup>
              {!members.find((m) => m.user_id === user.id) && (
                <IconButton
                  onClick={handleJoin}
                  sx={{ color: "green", opacity: 0.6 }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              )}
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
