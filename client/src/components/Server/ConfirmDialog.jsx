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
import {
  MEMBER_UPDATE,
  SERVER,
  SERVER_JOIN,
  SERVER_LEAVE,
} from "../../utils/constants";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";

export default function ConfirmDialog(props) {
  const { confirm, setOpen, server, setOpenResult, setConfirm } = props;
  const { setServers, setServer, setMode } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);

  const buttonClasses = useDisButtonStyles();
  const classes = useServerDialogStyles();

  const handleConfirm = async () => {
    try {
      const members = await addMember(server.id);
      socket.emit(MEMBER_UPDATE, members, server.id);
      const servers = await getServers();
      const joinedServer = await getServer(server.id);
      if (joinedServer && servers) {
        setOpenResult(false);
        setOpen(false);
        socket.emit(SERVER_LEAVE, server.id);
        socket.emit(SERVER_JOIN, joinedServer.id);
        setServers(servers);
        setServer(joinedServer);
        setMode(SERVER);
      }
    } catch (e) {
      console.log(e);
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
