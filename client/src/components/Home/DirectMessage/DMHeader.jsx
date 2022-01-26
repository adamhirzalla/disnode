import { SettingsInputComponent } from "@mui/icons-material";
import { Box, IconButton, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import ChannelMenuList from "../../Channel/ChannelMenuList";
import SettingsIcon from "@mui/icons-material/Settings";
const useStyles = makeStyles(() => ({
  header: {
    borderBottom: "1px solid rgb(4,11,12,0.4)",
    backgroundColor: "rgb(4,11,12,1)",
    minHeight: "80px",
    display: "flex",
    justifyContent: "center",
    borderBottomRightRadius: "7px",
    borderBottomLeftRadius: "7px",
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
  messages: { justifyContent: "flex-end", width: "75%" },
  form: { justifyContent: "flex-end", width: "100%" },
}));

export default function DMHeader() {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);
  return (
    <ListItem className={classes.header} alignItems="center">
      <Box className={classes.channel}>
        <Typography className={classes.title} component="span">
          # {"DMs coming soon!"}
        </Typography>
        {/* {participants.some((p) => p.creator_id === user.id) && ( */}
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
        {/* )}*/}
      </Box>
      <ChannelMenuList anchor={anchor} setAnchor={setAnchor} />
    </ListItem>
  );
}
