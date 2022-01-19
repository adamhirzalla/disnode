import { useState } from "react";
import {
  Dialog,
  Alert,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Avatar,
  Typography,
  Button,
  TextField,
} from "@mui/material/";
import DisButton from "../Button/DisButton";
import DisTextField from "../Inputs/DisTextField";
import { Search } from "@mui/icons-material";
import { useNewServerDialogStyles } from "../styles/useNewServerDialogStyles";
import { searchServer } from "../../network/serverApi";
import SearchedServer from "./SearchedServer";

export default function SearchServerDialog() {
  const classes = useNewServerDialogStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({ inviteCode: "", title: "" });
  const [server, setServer] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setSearch({ inviteCode: "", title: "" });
    setServer([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Search a server with invite code or title
  const handleSearch = () => {
    const { inviteCode, title } = search;
    if (!inviteCode && !title) {
      return setError("Please fill in Invite Code or Server Title.");
    } else if (inviteCode && title) {
      return setError("Please fill in one field only.");
    }
    searchedServer();
  };

  // make http request to find server
  const searchedServer = async () => {
    const server = await searchServer(search);
    if (!server.length) return setError("Can not find any server.");
    setError(null);
    setServer(server);
  };

  const parsedServer = server.map((server) => {
    return (
      <SearchedServer key={server.id} server={server} setServer={setServer} />
    );
  });

  return (
    <>
      <IconButton className={classes.addButton} onClick={handleClickOpen}>
        <Search fontSize="large" />
      </IconButton>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Search Server</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}

        <DialogContent className={classes.content}>
          <DisTextField
            autoFocus
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Invite Code"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearch((prev) => ({ ...prev, inviteCode: e.target.value }));
            }}
          />
          OR
          <DisTextField
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Search Server Title"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearch((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </DialogContent>

        <DialogActions>
          <DisButton type="cancel" onClick={handleClose}>
            Cancel
          </DisButton>
          <DisButton type="submit" onClick={handleSearch}>
            SEARCH
          </DisButton>
        </DialogActions>
        {parsedServer}
      </Dialog>
    </>
  );
}
