import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  IconButton,
  AvatarGroup,
  Tooltip,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useState } from "react";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import ConfirmDialog from "./ConfirmDialog";
import AuthContext from "../../contexts/AuthContext";

export default function SearchServerListDialog(props) {
  const { server, openResult, setOpenResult, setOpen } = props;
  const { title, logo, members, tags } = server;
  const [confirm, setConfirm] = useState(false);
  const classes = useServerDialogStyles();
  const {
    state: { user },
  } = useContext(AuthContext);

  const handleJoin = () => {
    setConfirm(true);
  };

  const parsedTags = tags.map((tag) => {
    return (
      <Chip
        key={tag.id}
        label={tag.name}
        variant="outlined"
        size="small"
        color="info"
      />
    );
  });

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
            {/* <ListItemButton className={classes.list}> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={title} src={logo} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.text}
                  sx={{ pl: "20px" }}
                  primary={server.title}
                />
              </Box>
              <Stack direction="row" spacing={0.5}>
                {parsedTags}
              </Stack>
            </Box>

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
            {/* </ListItemButton> */}
          </ListItem>
          {confirm && (
            <ConfirmDialog
              setConfirm={setConfirm}
              confirm={confirm}
              setOpenResult={setOpenResult}
              server={server}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </>
  );
}
