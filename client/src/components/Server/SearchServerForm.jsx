import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { searchServers } from "../../network/serverApi";
import Tags from "./Tags";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  content: {
    width: "90%",
    // paddingBottom: "42px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    // alignItems: "center",
    overflow: "hidden",
  },
  submit: {
    color: "white",
    borderRadius: ".3em",
    backgroundColor: "#7a211b",
    "&:hover": {
      backgroundColor: "#635c5b",
    },
  },
  cancel: {
    color: "white",
    borderRadius: ".3em",
    border: "1px solid #7a211b",
    "&:hover": {
      color: "#7a211b",
      border: "1px solid #635c5b",
    },
  },
}));

export default function SearchServerForm(props) {
  const { setSearch, handleClose, setError, search, setResult, setOpenResult } =
    props;
  const classes = useStyles();
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  // Search a server with invite code, title or tags
  const handleSearch = async () => {
    const { inviteCode, title } = search;
    if (!inviteCode && !title && !tags.length) {
      return setError("Fill out a field to search by");
    } else if (
      (inviteCode && title) ||
      (inviteCode && tags.length) ||
      (title && tags.length)
    ) {
      return setError("Only 1 field must be filled");
    }

    // make http request to find server
    // then open Server List dialog
    const servers = await searchServers(search);
    if (!servers?.length) return setError("Could not find any servers");
    setError(null);
    setResult(servers);
    setOpenResult(true);
  };

  return (
    <>
      <DialogContent className={classes.content}>
        Title
        <TextField
          autoFocus
          type="text"
          fullWidth
          variant="outlined"
          placeholder="by Title..."
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        Invite Code
        <TextField
          type="text"
          fullWidth
          variant="outlined"
          placeholder="by Invite Code..."
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch((prev) => ({ ...prev, inviteCode: e.target.value }));
          }}
        />
        Tags
        <Tags setTags={setTags} setSearch={setSearch} search={search} />
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
          onClick={handleSearch}
          type="submit"
          sx={{
            color: "white",
            opacity: 0.8,
            "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
            backgroundColor: "rgb(199, 58, 58,0.8)",
          }}
          // startIcon={<DoNotDisturbIcon />}
        >
          Search
        </Button>
      </DialogActions>
    </>
  );
}
