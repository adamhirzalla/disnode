import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "../Button/CustomButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SelectButton from "./SelectButton";
import Tags from "./Tags";
import Avatar from "@mui/material/Avatar";
import { Alert } from "@mui/material";
import { IconButton } from "@mui/material";

// styles
import { useNewServerDialogStyles } from "../styles/useNewServerDialogStyles";

export default function NewServerDialog(props) {
  const { onClick: createServer } = props;
  const classes = useNewServerDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleChange = (e) => {
    setTitle((prev) => e.target.value);
  };

  const handleCreate = () => {
    setOpen(false);
    createServer({ title, tags, file });
  };
  return (
    <div>
      <IconButton
        className={classes.addButton}
        disableRipple
        disableFocusRipple
        onClick={handleClickOpen}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>

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
          <TextField
            autoFocus
            margin="normal"
            multiline
            id="title"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Title"
            onChange={handleChange}
            InputProps={{
              className: classes.root,
            }}
          />
          <Tags setTags={setTags} />
        </DialogContent>
        <DialogActions>
          <CustomButton variant="text" onClick={handleClose} name="Cancel" />
          <CustomButton
            variant="contained"
            onClick={handleCreate}
            name="Create"
          />
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
