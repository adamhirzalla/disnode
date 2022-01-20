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
      return setError("Please fill in Invite Code or Server Title.");
    } else if (inviteCode && title) {
      return setError("Please fill in one field only.");
    }

    // make http request to find server
    // then open Server List dialog
    const servers = await searchServers(search);
    console.log(servers);
    if (!servers?.length) return setError("Can not find any server.");
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
          placeholder="Invite Code"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch((prev) => ({ ...prev, inviteCode: e.target.value }));
          }}
        />
        OR
        <TextField
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
