import { useState } from "react";
import {
  Dialog,
  Alert,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material/";
import { Search } from "@mui/icons-material";
import SearchServerListDialog from "./SearchServerListDialog";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import CloseIcon from "@mui/icons-material/Close";
import SearchServerForm from "./SearchServerForm";

export default function SearchServerDialog() {
  const classes = useServerDialogStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({ inviteCode: "", title: "" });
  const [result, setResult] = useState([]);
  const [openResult, setOpenResult] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setSearch({ inviteCode: "", title: "" });
    setResult([]);
  };

  const parsedServers = result.map((server) => {
    return (
      <SearchServerListDialog
        key={server.id}
        openResult={openResult}
        server={server}
      />
    );
  });

  return (
    <>
      <IconButton className={classes.addButton} onClick={() => setOpen(true)}>
        <Search fontSize="small" />
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
          search={search}
          handleClose={handleClose}
          setError={setError}
          setResult={setResult}
          setOpenResult={setOpenResult}
        />

        {/* result server list dialog */}
        {!error && (
          <Dialog
            classes={{ paper: classes.serverListpaper }}
            open={openResult}
            onClose={() => setOpenResult(false)}
          >
            <IconButton
              sx={{ position: "absolute", top: 15, right: 15 }}
              onClick={() => setOpenResult(false)}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle style={{ fontSize: "1.55em" }}>
              Search Result
            </DialogTitle>
            <DialogContent dividers sx={{ p: 0 }}>
              {parsedServers}
            </DialogContent>
          </Dialog>
        )}
      </Dialog>
    </>
  );
}
