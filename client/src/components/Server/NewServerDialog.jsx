import Tags from "./Tags";
import { useState } from "react";
import { Alert } from "@mui/material";
import UploadButton from "./UploadButton";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import DisButton from "../Button/DisButton";
import DisTextField from "../Inputs/DisTextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// styles
import { useNewServerDialogStyles } from "../styles/useNewServerDialogStyles";

export default function NewServerDialog({ onClick: addServer }) {
  const classes = useNewServerDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

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

  const handleAdd = () => {
    const logo = "https://i.redd.it/kzndsge5ver41.png";
    setOpen(false);
    addServer({ title, tags, logo });
    // setError("Server creation failed. Please try again later.");
  };
  return (
    <div>
      <IconButton className={classes.addButton} onClick={handleClickOpen}>
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
                width: "62px",
                height: "62px",
              }}
              alt="stock"
              src="https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86"
            />
          </div>
          <UploadButton />
          <DisTextField
            autoFocus
            multiline
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={handleChange}
          />
          <Tags setTags={setTags} />
        </DialogContent>
        <DialogActions>
          <DisButton type="cancel" onClick={handleClose}>
            Cancel
          </DisButton>
          <DisButton type="create" onClick={handleAdd}>
            Create
          </DisButton>
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
