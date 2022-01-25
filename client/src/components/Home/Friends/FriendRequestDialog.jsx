import { Dialog, DialogTitle, IconButton, ListItem } from "@mui/material";
import { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../../contexts/AuthContext";
import FriendRecivedList from "./FriendRecivedList";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    minHeight: "45%",
    alignItems: "center",
    borderRadius: "2em",
    textAlign: "center",
    padding: "40px",
    justifyContent: "start",
  },
  listItem: {
    overflowY: "auto",
    "& .MuiListItemButton-root": {
      borderRadius: "2em",
    },
    flexDirection: "column",
  },
}));

export default function FriendRequestDialog(props) {
  const { open, setOpen } = props;
  const classes = useStyles();
  const [request, setRequest] = useState(true);
  const {
    state: {
      requests: { received, sent },
    },
  } = useContext(AuthContext);

  const header = request
    ? received.length
      ? "Received Friend Requests"
      : "No Requests Received"
    : sent.length
    ? "Sent Friend Requests"
    : "No Requests Sent";

  const handleClose = () => {
    setOpen(false);
    setRequest(true);
  };

  const parsedRequests = request
    ? received.map((sender) => {
        return (
          <FriendRecivedList
            key={sender.id}
            sender={sender}
            request={request}
          />
        );
      })
    : sent.map((receiver) => {
        return (
          <FriendRecivedList
            key={receiver.id}
            receiver={receiver}
            request={request}
          />
        );
      });

  return (
    <Dialog
      classes={{
        paper: classes.dialogPaper,
      }}
      open={open}
      onClose={handleClose}
    >
      <SwitchAccountIcon
        color="info"
        fontSize="large"
        sx={{
          position: "absolute",
          top: "25px",
          right: "25px",
          cursor: "pointer",
        }}
        onClick={() => setRequest(!request)}
      />
      <DialogTitle style={{ fontSize: "1.3em", margin: "20px 0" }}>
        {header}
      </DialogTitle>

      <ListItem className={classes.listItem} disablePadding>
        {parsedRequests}
      </ListItem>
    </Dialog>
  );
}
