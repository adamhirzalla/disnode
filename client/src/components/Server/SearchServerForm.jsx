import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";

export default function SearchServerForm({
  setSearch,
  handleKeyDown,
  handleClose,
  handleSearch,
}) {
  const classes = useServerDialogStyles();
  const buttonClasses = useDisButtonStyles();

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
