import Tags from "./Tags";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import SelectButton from "./SelectButton";
import Avatar from "@mui/material/Avatar";
import { Alert, Button, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DisButton from "../Button/DisButton";
import DisTextField from "../Inputs/DisTextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import uploadtoS3 from "../../utils/s3";
import {
  createServer,
  createTags,
  getServer,
  getServers,
} from "../../network/serverApi";
import {
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  SERVER,
  SERVER_JOIN,
  SERVER_LEAVE,
} from "../../utils/constants";

// styles
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import { useContext } from "react";
import ServerContext from "../../contexts/ServerContext";
import AuthContext from "../../contexts/AuthContext";

export default function NewServerDialog() {
  const classes = useServerDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const { setServer, setServers, setMode, app } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setTitle("");
    setTags([]);
    setFile(null);
  };

  const handleChange = (e) => {
    setTitle((prev) => e.target.value);
  };

  const handleCreate = async () => {
    if (!tags.length) return setError("Please include at least one tag");
    // ({ title, tags, file });
    // handleClose();
    // setServer(server);

    // const { title, tags, file } = input;
    // we get back an array or urls (to support multiple file upload)
    const formData = new FormData();
    formData.append("image", file);
    try {
      let logo;
      if (file) [logo] = await uploadtoS3(formData);
      const data = file ? logo : "/images/Disnode-red.png";
      const { id } = await createServer(title, data);
      await createTags(tags, id);
      const servers = await getServers();
      const server = await getServer(id);
      if (server && servers) {
        handleClose();
        socket.emit(SERVER_JOIN, server.id);
        if (app.server.id) socket.emit(SERVER_LEAVE, app.server.id);
        if (app.channel) socket.emit(CHANNEL_LEAVE, app.channel.id);
        const channels = Object.values(server?.channels);
        socket.emit(CHANNEL_JOIN, {
          id: channels[0]?.id,
          server_id: server.id,
        });
        setServers(servers);
        setServer(server);
        setMode(SERVER);
      }
    } catch (e) {
      console.log("Could not create server");
    }
  };
  return (
    <div>
      <Tooltip title={"Create Server"} arrow placement="top">
        <IconButton className={classes.addButton} onClick={handleClickOpen}>
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Create Server</DialogTitle>
        <DialogContent className={classes.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              style={{
                width: "85px",
                height: "85px",
              }}
              imgProps={{ id: "image-preview" }}
              src="/images/Disnode-red.png"
            />
          </div>
          <SelectButton setFile={setFile} />
          <DisTextField
            autoFocus
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={handleChange}
          />
          <Tags setTags={setTags} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disableRipple
            color="primary"
            onClick={handleClose}
            sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableRipple
            onClick={handleCreate}
            sx={{
              color: "white",
              opacity: 0.8,
              "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
              backgroundColor: "rgb(199, 58, 58,0.8)",
            }}
            // startIcon={<DoNotDisturbIcon />}
          >
            Create
          </Button>
        </DialogActions>
        {error && <Alert severity="error">{error}</Alert>}
      </Dialog>
    </div>
  );
}

// // for handling errors
// const [error, setError] = useState(null);
// // in the form for creating a server
// const handleSubmit = () => {
//   const body = {
//     title: serverName,
//     image: imageUrl,
//     creatorId: creatorId,
//   };

//   // need to look up syntax for axios post calls
//   axios.post("/api/servers/create", body).then((res) => {
//     if (res.status === 200) {
//       // redirect to the new server (i.e. #general)
//     } else {
//       setError('Server creation failed. Please try again later.')
//     }
//   });
// };

// return (
//   <form></form>

//   // conditionally show the error under the form
//   {error && <Alert severity="error">{error}</Alert>}
// )
