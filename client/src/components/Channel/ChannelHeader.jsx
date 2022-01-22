import { IconButton, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import ServerContext from "../../contexts/ServerContext";
import ChannelEditDialog from "./ChannelEditDialog";
import AuthContext from "../../contexts/AuthContext";

const useStyles = makeStyles({
  header: {
    borderBottom: "1px solid rgb(4,11,12,0.4)",
    backgroundColor: "rgb(4,11,12,1)",
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
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [input, setInput] = useState(channel.title);

  const handleClick = () => {
    setInput(channel.title);
    setOpen(true);
  };

  console.log(members.find((m) => m.user_id === user.id).role);
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
          <IconButton sx={{ mr: 1 }} onClick={handleClick}>
            <EditIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Box>
      <ChannelEditDialog
        open={open}
        setOpen={setOpen}
        input={input}
        setInput={setInput}
        channel={channel}
      />
    </ListItem>
  );
}
