import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ServerContext from "../../contexts/ServerContext";
import { addMember } from "../../network/memberApi";
import { getServer, getServers } from "../../network/serverApi";
import { SERVER } from "../../utils/constants";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";

export default function ConfirmDialog(props) {
  const { confirm, setOpen, server, setOpenResult, setConfirm } = props;
  const { setServers, setServer, setMode } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  const buttonClasses = useDisButtonStyles();
  const classes = useServerDialogStyles();

  const handleConfirm = async () => {
    await addMember(server.id, user.id);
    const servers = await getServers();
    const joinedServer = await getServer(server.id);
    setOpenResult(false);
    setOpen(false);
    if (joinedServer && servers) {
      setServers(servers);
      setServer(joinedServer);
      setMode(SERVER);
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={confirm}
      onClose={() => setConfirm(false)}
    >
      <DialogTitle>{server.title}</DialogTitle>
      <DialogContentText>{`Are you sure you want to Join?`}</DialogContentText>
      <DialogActions>
        <Button
          className={buttonClasses.cancel}
          onClick={() => setConfirm(false)}
        >
          Cancel
        </Button>
        <Button className={buttonClasses.submit} onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
