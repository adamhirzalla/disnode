import { IconButton, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import ServerContext from "../../contexts/ServerContext";

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
  const classes = useStyles();
  const {
    app: { channel },
  } = useContext(ServerContext);
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
        <IconButton sx={{ mr: 1 }}>
          <EditIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
    </ListItem>
  );
}
