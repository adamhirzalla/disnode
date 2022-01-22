import { IconButton, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import ChannelMenuList from "./ChannelMenuList";
// import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles({
  header: {
    borderBottom: "1px solid rgb(4,11,12,0.4)",
    backgroundColor: "rgb(4,11,12,1)",
    height: "58px",
  },
  title: {
    color: "white",
  },
});

export default function ChannelHeader() {
  const {
    app: { channel, members },
  } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);

  return (
    <ListItem
      className={classes.header}
      alignItems="center"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box style={{ width: "100%" }} className={classes.channel}>
        <Typography className={classes.title} component="span">
          # {channel?.title}
        </Typography>
        {members.find((m) => m.user_id === user.id).role !== "user" && (
          <>
            <IconButton
              sx={{ mr: 1 }}
              onClick={(e) => {
                setAnchor(e.currentTarget);
              }}
            >
              <SettingsIcon
                sx={{ color: "white", opacity: 0.5, "&:hover": { opacity: 1 } }}
              />
            </IconButton>
            <ChannelMenuList anchor={anchor} setAnchor={setAnchor} />
          </>
        )}
      </Box>
    </ListItem>
  );
}
