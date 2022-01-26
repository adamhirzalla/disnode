import { Dialog, DialogTitle, IconButton, ListItem } from "@mui/material";
import { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../../contexts/AuthContext";
import RequestListItem from "./RequestListItem";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Outgoing from "@mui/icons-material/CallMissedOutgoing";
import Incoming from "@mui/icons-material/CallReceived";

const useStyles = makeStyles(() => ({
  // dialogPaper: {
  //   display: "flex",
  //   flexDirection: "column",
  //   width: "30%",
  //   minHeight: "200px",
  //   alignItems: "center",
  //   borderRadius: "2em",
  //   textAlign: "center",
  //   padding: "40px",
  //   justifyContent: "start",
  // },
  dialog: {
    // backgroundColor: "green",
  },
  listItem: {
    overflowY: "auto",
    minHeight: "350px",
    minWidth: "500px",
    "& .MuiListItemButton-root": {
      borderRadius: "0.5em",
    },
    flexDirection: "column",
  },
}));

const [RECEIVED, SENT] = ["RECEIVED", "SENT"];

export default function FriendRequestDialog(props) {
  const { open, setOpen } = props;
  const classes = useStyles();
  const [view, setView] = useState(RECEIVED);
  const {
    state: {
      user: { requests },
    },
  } = useContext(AuthContext);

  const header =
    view === RECEIVED
      ? requests.received.length
        ? "Pending friend requests"
        : "You haven't received anything..."
      : view === SENT
      ? requests.sent.length
        ? "Sent friend requests"
        : "No pending sent requests"
      : null;

  const handleClose = () => {
    setOpen(false);
  };

  const toggleView = () => {
    setView((prev) => (prev === RECEIVED ? SENT : RECEIVED));
  };

  const parsedRequests =
    view === RECEIVED
      ? requests.received.map((user) => {
          return (
            <RequestListItem
              key={user.request_id}
              user={user}
              view={view}
              received
            />
          );
        })
      : view === SENT
      ? requests.sent.map((user) => {
          return (
            <RequestListItem
              key={user.request_id}
              user={user}
              view={view}
              sent
            />
          );
        })
      : null;

  return (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      {view === SENT && (
        <Incoming
          color="info"
          fontSize="medium"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={toggleView}
        />
      )}
      {view === RECEIVED && (
        <Outgoing
          color="info"
          fontSize="medium"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          onClick={toggleView}
        />
      )}

      <DialogTitle
        style={{ fontSize: "1.3em", margin: "20px 20px", textAlign: "center" }}
      >
        {header}
      </DialogTitle>

      <ListItem className={classes.listItem}>{parsedRequests}</ListItem>
    </Dialog>
  );
}
