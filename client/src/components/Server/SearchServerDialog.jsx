import { useState } from "react";
import {
  Dialog,
  Alert,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material/";
import { Search } from "@mui/icons-material";
import { searchServer } from "../../network/serverApi";
import SearchServerListDialog from "./SearchServerListDialog";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import CloseIcon from "@mui/icons-material/Close";
import SearchServerForm from "./SearchServerForm";

export default function SearchServerDialog() {
  const classes = useServerDialogStyles();
  const buttonClasses = useDisButtonStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({ inviteCode: "", title: "" });
  const [server, setServer] = useState([]);
  const [result, setResult] = useState(false);

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
  // then open Server List dialog
  const searchedServer = async () => {
    const server = await searchServer(search);
    if (!server.length) return setError("Can not find any server.");
    setError(null);
    setServer(server);
    setResult(true);
  };

  const parsedServer = server.map((server) => {
    return (
      <SearchServerListDialog key={server.id} result={result} server={server} />
    );
  });

  return (
    <>
      <IconButton className={classes.addButton} onClick={() => setOpen(true)}>
        <Search fontSize="large" />
      </IconButton>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Search Server</DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}

        {/* search server form */}
        <SearchServerForm
          setSearch={setSearch}
          handleKeyDown={handleKeyDown}
          handleClose={handleClose}
          handleSearch={handleSearch}
        />

        {/* result server list dialog */}
        {result && (
          <Dialog
            classes={{ paper: classes.serverListpaper }}
            open={result}
            onClose={() => setResult(false)}
          >
            <IconButton
              sx={{ position: "absolute", top: 15, right: 15 }}
              onClick={() => setResult(false)}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle style={{ fontSize: "1.55em" }}>
              Search Result
            </DialogTitle>
            <DialogContent dividers={"paper"} sx={{ p: 0 }}>
              {parsedServer}
            </DialogContent>
          </Dialog>
        )}
      </Dialog>
    </>
  );
}
