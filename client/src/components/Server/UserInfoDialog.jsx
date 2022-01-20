import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import SelectButton from "./SelectButton";
import { makeStyles, createStyles } from "@mui/styles";
import UserConnection from "./UserConnection";
import UserForm from "./UserForm";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import ConnectionsDialog from "./ConnectionsDialog";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";

const useStyles = makeStyles({
  dialogPaper: {
    display: "flex",
    minHeight: "80%",
    minWidth: "35%",
    alignItems: "center",
    borderRadius: "1em",
    textAlign: "center",
    padding: "20px 20px 40px 40px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflowY: "auto",
  },
  connections: {
    marginTop: "20px",
  },
});
const [STEAM, EPIC, BLIZZARD, DISCORD, RIOT, ORIGIN] = [
  "STEAM",
  "EPIC",
  "BLIZZARD",
  "DISCORD",
  "RIOT",
  "ORIGIN",
];
const initialInput = {
  file: null,
  full_name: "",
  nickname: "",
  bio: "",
  steam: "",
  epic: "",
  blizzard: "",
  discord: "",
  riot: "",
  origin: "",
};
export default function UserInfoDialog({ open, setOpen }) {
  const [dialog, setDialog] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [icon, setIcon] = useState("");
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(AuthContext);
  const { avatar } = user;

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("Wire me to API. Here's all the form input", input);
  };

  const handleUndo = () => {
    const preview = document.querySelector("#image-preview");
    preview.src = user?.avatar;
    setInput((prev) => ({ ...prev, file: null }));
  };

  const handleDialog = (icon) => {
    setIcon(icon);
    setDialog(true);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle style={{ fontSize: "1.55em" }}>Edit Profile</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
            marginBottom: "40px",
          }}
        >
          <Avatar
            style={{
              width: "70px",
              height: "70px",
              marginBottom: "20px",
            }}
            src={avatar}
            imgProps={{ id: "image-preview" }}
          />
          <SelectButton setInput={setInput} />
          <Button color="error" onClick={handleUndo}>
            Undo
          </Button>
        </Box>

        {/* full name, nickname, bio form*/}
        <UserForm input={input} setInput={setInput} />

        {/* connection form */}
        {/* <UserConnection /> */}
        <ConnectionsDialog
          icon={icon}
          input={input}
          open={dialog}
          setOpen={setDialog}
          setInput={setInput}
        />
        <Grid container className={classes.connections}>
          <Grid item xs={4}>
            <IconButton onClick={() => handleDialog(STEAM)}>
              <SteamSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => handleDialog(EPIC)}>
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => handleDialog(BLIZZARD)}>
              <RiotGamesSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => handleDialog(DISCORD)}>
              <EpicGamesSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => handleDialog(RIOT)}>
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => handleDialog(ORIGIN)}>
              <RiotGamesSvg />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
    </Dialog>
  );
}
