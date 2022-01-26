import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  AvatarGroup,
  Tooltip,
  Stack,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import AuthContext from "../../contexts/AuthContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SearchServerListDialog(props) {
  const { server, openResult, setOpenResult, setOpen } = props;
  const { title, logo, members, tags } = server;
  const [confirm, setConfirm] = useState(false);
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
            sx={{
              borderRadius: "0.5em",
              border: "1px solid gray",
              margin: "10px 0",

              "& .MuiListItemButton-root": {},
            }}
            // disablePadding
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
                  <Avatar
                    alt={title}
                    src={logo}
                    sx={{ height: "70px", width: "70px" }}
                  />
                </ListItemAvatar>
                <ListItemText sx={{ pl: "20px" }} primary={server.title} />
              </Box>
              <Stack
                direction="row"
                spacing={1}
                // sx={{ justifyContent: "center" }}
              >
                {parsedTags}
              </Stack>
            </Box>

            <AvatarGroup total={members.length} sx={{ pr: "auto" }}>
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
            {!members.find((m) => m.user_id === user.id) ? (
              <IconButton
                onClick={handleJoin}
                sx={{ color: "green", opacity: 0.6 }}
              >
                <AddCircleOutlineIcon fontSize="medium" />
              </IconButton>
            ) : (
              <CheckCircleIcon
                fontSize="medium"
                sx={{ color: "green", opacity: 0.6, padding: "0 10px" }}
              />
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
