import { IconButton, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import ChannelMenuList from "./ChannelMenuList";
// import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles({
  header: {
    borderBottom: "1px solid rgb(4,11,12,0.4)",
    backgroundColor: "rgb(4,11,12,1)",
    minHeight: "58px",
    display: "flex",
    justifyContent: "center",
    borderBottomLeftRadius: "7px",
    borderBottomRightRadius: "7px",
  },
  title: {
    color: "white",
  },
  channel: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function ChannelHeader() {
  const {
    app: { channel, members, channels },
    setChannel,
  } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);

  // useEffect(() => {
  //   setChannel(channel?.id);
  // }, [channels]);

  return (
    <ListItem className={classes.header} alignItems="center">
      <Box className={classes.channel}>
        <Typography className={classes.title} component="span">
          # {channel?.title}
        </Typography>
        {members.find((m) => m.user_id === user.id).role !== "user" && (
          <IconButton
            sx={{ mr: 1 }}
            onClick={(e) => {
              setAnchor(e.currentTarget);
            }}
          >
            <SettingsIcon
              sx={{
                // fontSize: "large",
                color: "white",
                opacity: 0.5,
                "&:hover": { opacity: 1 },
              }}
            />
          </IconButton>
        )}
      </Box>
      <ChannelMenuList anchor={anchor} setAnchor={setAnchor} />
    </ListItem>
  );
}
