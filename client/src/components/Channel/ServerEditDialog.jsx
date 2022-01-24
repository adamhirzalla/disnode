import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import ServerContext from "../../contexts/ServerContext";
import DisButton from "../Button/DisButton";
import DisTextField from "../Inputs/DisTextField";
import SelectButton from "../Server/SelectButton";
import Tags from "../Server/Tags";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import uploadtoS3 from "../../utils/s3";
import { updateServer } from "../../network/serverApi";
import { EDIT_SERVER } from "../../utils/constants";
import { Box } from "@mui/system";

export default function ServerEditDialog(props) {
  const { open, setOpen } = props;
  const { app, appDispatch } = useContext(ServerContext);
  const { server } = app;
  const initialInput = {
    logo: server.logo,
    title: server.title,
  };
  const classes = useServerDialogStyles();
  const [input, setInput] = useState(initialInput);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleCancel = () => {
    setTimeout(() => {
      setInput(initialInput);
    }, 200);
    setOpen(false);
    setError(null);
  };

  const handleUndo = () => {
    const preview = document.querySelector("#image-preview");
    preview.src = server.logo;
    setFile(null);
  };

  const handleEdit = async () => {
    input.tags = tags;
    if (!input.title) return setError("Title can not be empty");
    const formData = new FormData();
    formData.append("image", file);
    let logo;
    if (file) [logo] = await uploadtoS3(formData);
    const data = file ? { ...input, logo } : input;

    const server = await updateServer(app.server.id, data);
    appDispatch({ type: EDIT_SERVER, server });
    setOpen(false);
    setError(null);
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Edit Server</DialogTitle>
        <DialogContent className={classes.content}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              style={{
                width: "85px",
                height: "85px",
                marginBottom: "20px",
              }}
              imgProps={{ id: "image-preview" }}
              src={server.logo}
            />
            <SelectButton setFile={setFile} />
            <Button color="error" onClick={handleUndo}>
              Undo
            </Button>
          </Box>
          <DisTextField
            autoFocus
            type="text"
            fullWidth
            variant="outlined"
            label="Title"
            value={input.title}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: "30px" }}
          />
          <Tags setTags={setTags} serverTags={server.tags} />
        </DialogContent>
        <DialogActions>
          <DisButton disStyle="cancel" onClick={handleCancel}>
            Cancel
          </DisButton>
          <DisButton disStyle="submit" onClick={handleEdit}>
            Edit
          </DisButton>
        </DialogActions>
        {error && <Alert severity="error">{error}</Alert>}
      </Dialog>
    </div>
  );
}
