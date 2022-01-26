import { useState } from "react";
import {
  Dialog,
  Alert,
  IconButton,
  DialogTitle,
  DialogContent,
  Tooltip,
  DialogActions,
  Box,
} from "@mui/material/";
import { Search } from "@mui/icons-material";
import SearchServerListDialog from "./SearchServerListDialog";
import CloseIcon from "@mui/icons-material/Close";
import SearchServerForm from "./SearchServerForm";
import { makeStyles } from "@mui/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { getAllServers } from "../../network/serverApi";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    minHeight: "60%",
    alignItems: "center",
    borderRadius: "0.5em",
    textAlign: "center",
    padding: "40px",
    justifyContent: "start",
    overflowY: "auto",
    overflowX: "hidden",
  },
  listItem: {
    overflowY: "auto",
    "& .MuiListItemButton-root": {
      borderRadius: "0.5em",
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
    borderRadius: "0.5em",
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

  // make http request to find all the servers
  const handleExplore = async () => {
    const servers = await getAllServers();
    setError(null);
    setResult(servers);
    setOpenResult(true);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogTitle style={{ fontSize: "1.55em" }}>
            Search Server
          </DialogTitle>
          <DialogActions>
            <Tooltip title="All Servers" placement="right">
              <FormatListBulletedIcon
                onClick={handleExplore}
                color="info"
                sx={{
                  opacity: 0.5,
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
              />
            </Tooltip>
          </DialogActions>
        </Box>
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
            <DialogContent
              dividers
              sx={{
                p: "20px",
                "&::-webkit-scrollbar": {
                  borderRadius: "30px",
                  width: "2px",
                },
                "&::-webkit-scrollbar-track": {
                  WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgb(0,0,0,0.3)",
                  borderRadius: "30px",
                },
              }}
            >
              {parsedServers}
            </DialogContent>
          </Dialog>
        )}
      </Dialog>
    </>
  );
}
