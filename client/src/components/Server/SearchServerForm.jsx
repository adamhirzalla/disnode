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
    borderRadius: ".8em",
    backgroundColor: "#7a211b",
    "&:hover": {
      backgroundColor: "#635c5b",
    },
  },
  cancel: {
    color: "#7a211b",
    borderRadius: ".8em",
    border: "1px solid #7a211b",
    "&:hover": {
      color: "#635c5b",
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
      return setError("Enter a server title or code to search for");
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
        By Title
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
        By Invite Code
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
        By Tags
        <Tags setTags={setTags} setSearch={setSearch} search={search} />
      </DialogContent>
      <DialogActions>
        <Button className={classes.cancel} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={classes.submit} type="submit" onClick={handleSearch}>
          SEARCH
        </Button>
      </DialogActions>
    </>
  );
}
