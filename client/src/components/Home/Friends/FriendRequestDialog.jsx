import { Dialog, DialogTitle, ListItem } from "@mui/material";
import React, { useContext } from "react";
import { useServerDialogStyles } from "../../styles/useServerDialogStyles";
import AuthContext from "../../../contexts/AuthContext";
import FriendRecivedList from "./FriendRecivedList";

export default function FriendRequestDialog(props) {
  const { open, setOpen } = props;
  const classes = useServerDialogStyles();
  const {
    state: {
      requests: { received },
    },
  } = useContext(AuthContext);

  const header = received.length ? "Friend Request" : "No Friend Request";

  const parsedFriends = received.map((sender) => {
    return <FriendRecivedList key={sender.id} sender={sender} />;
  });

  return (
    <Dialog
      classes={{ paper: classes.dialogPaperRequest }}
      sx={{ width: "100%", height: "100%" }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle style={{ fontSize: "1.55em" }}>{header}</DialogTitle>

      <ListItem
        className={classes.listItem}
        sx={{
          overflow: "auto",
          "& .MuiListItemButton-root": {
            borderRadius: "2em",
          },
          flexDirection: "column",
        }}
        disablePadding
      >
        {parsedFriends}
      </ListItem>
    </Dialog>
  );
}
