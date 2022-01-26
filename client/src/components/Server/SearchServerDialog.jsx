import { useState } from "react";
import {
  Dialog,
  Alert,
  IconButton,
  DialogTitle,
  DialogContent,
  Tooltip,
} from "@mui/material/";
import { Search } from "@mui/icons-material";
import SearchServerListDialog from "./SearchServerListDialog";
import CloseIcon from "@mui/icons-material/Close";
import SearchServerForm from "./SearchServerForm";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    minHeight: "60%",
    alignItems: "center",
    borderRadius: "2em",
    textAlign: "center",
    padding: "40px",
    justifyContent: "start",
    overflowY: "auto",
    overflowX: "hidden",
  },
  listItem: {
    overflowY: "auto",
    "& .MuiListItemButton-root": {
      borderRadius: "2em",
    },
    flexDirection: "column",
  },
  addButton: {
    marginTop: "0.2em",
    color: "#FFFFFF",
    opacity: "0.8",
    "&:hover": {
      opacity: "1",
    },
  },
  serverListpaper: {
    display: "flex",
    width: "100%",
    maxHeight: "50%",
    minHeight: "80%",
    borderRadius: "2em",
    textAlign: "center",
    padding: "30px",
  },
}));

const initialInput = { inviteCode: "", title: "", tags: [] };

export default function SearchServerDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(initialInput);
  const [result, setResult] = useState([]);
  const [openResult, setOpenResult] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setSearch(initialInput);
    setResult([]);
  };

  const parsedServers = result.map((server) => {
    return (
      <SearchServerListDialog
        key={server.id}
        openResult={openResult}
        server={server}
        setOpen={setOpen}
        setOpenResult={setOpenResult}
      />
    );
  });

  return (
    <>
      <Tooltip title={"Search Servers"} arrow placement="top">
        <IconButton className={classes.addButton} onClick={() => setOpen(true)}>
          <Search fontSize="medium" />
        </IconButton>
      </Tooltip>
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
