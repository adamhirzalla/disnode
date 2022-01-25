import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { searchServers } from "../../network/serverApi";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";

export default function SearchServerForm(props) {
  const { setSearch, handleClose, setError, search, setResult, setOpenResult } =
    props;
  const classes = useServerDialogStyles();
  const buttonClasses = useDisButtonStyles();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Search a server with invite code or title
  const handleSearch = async () => {
    const { inviteCode, title } = search;
    if (!inviteCode && !title) {
      return setError("Enter a server title or code to search for");
    } else if (inviteCode && title) {
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
        OR
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
      </DialogContent>
      <DialogActions>
        <Button className={buttonClasses.cancel} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className={buttonClasses.submit}
          type="submit"
          onClick={handleSearch}
        >
          SEARCH
        </Button>
      </DialogActions>
    </>
  );
}
