import {
  Alert,
  Avatar,
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

export default function ServerEditDialog(props) {
  const { open, setOpen } = props;
  const {
    app: { server },
  } = useContext(ServerContext);
  const classes = useServerDialogStyles();
  const [file, setFile] = useState();
  const [title, setTitle] = useState(server.title);
  const [tags, setTags] = useState(server.tags);

  console.log(tags);
  const handleCancel = () => {
    setTimeout(() => {
      setTitle(server.title);
    }, 200);
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
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
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Tags setTags={setTags} serverTags={server.tags} />
        </DialogContent>
        <DialogActions>
          <DisButton disStyle="cancel" onClick={handleCancel}>
            Cancel
          </DisButton>
          <DisButton disStyle="submit" onClick={handleCreate}>
            Create
          </DisButton>
        </DialogActions>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
      </Dialog>
    </div>
  );
}
