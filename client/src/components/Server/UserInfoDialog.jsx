import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import SelectButton from "./SelectButton";
import { makeStyles } from "@mui/styles";
import UserForm from "./UserForm";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import ConnectionsDialog from "./ConnectionsDialog";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import { updateProfile } from "../../network/userApi";
import uploadtoS3 from "../../utils/s3";

const useStyles = makeStyles({
  dialogPaper: {
    display: "flex",
    maxHeight: "90%",
    width: "30%",
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

export default function UserInfoDialog({ open, setOpen }) {
  const {
    state: { user },
    setUser,
  } = useContext(AuthContext);
  const { id, avatar, full_name, nickname, bio, socials } = user;

  const initialInput = {
    file: null,
    avatar,
    full_name,
    nickname,
    bio,
    STEAM: { id: 1, url: socials.find((social) => social.id === 1)?.url || "" },
    socials: [
      {
        id: 1,
        url: socials.find((social) => social.id === 1)?.url || "",
      },
      {
        id: 2,
        url: socials.find((social) => social.id === 2)?.url || "",
      },
      {
        id: 3,
        url: socials.find((social) => social.id === 3)?.url || "",
      },
      {
        id: 4,
        url: socials.find((social) => social.id === 4)?.url || "",
      },
      {
        id: 5,
        url: socials.find((social) => social.id === 5)?.url || "",
      },
      {
        id: 6,
        url: socials.find((social) => social.id === 6)?.url || "",
      },
    ],
    // socails: [    {STEAM: socials.find((social) => social.id === 1)?.url || ""},
    // {EPIC: socials.find((social) => social.id === 2)?.url || ""},
    // {BLIZZARD: socials.find((social) => social.id === 3)?.url || ""},
    // {DISCORD: socials.find((social) => social.id === 4)?.url || ""},
    // {RIOT: socials.find((social) => social.id === 5)?.url || ""},
    // {ORIGIN: socials.find((social) => social.id === 6)?.url || ""},]
  };

  const [input, setInput] = useState(initialInput);
  const [dialog, setDialog] = useState(false);
  const [icon, setIcon] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    setInput(initialInput);
    setOpen(false);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("image", initialInput.file);
    const [logo] = await uploadtoS3(formData);

    const updatedUser = await updateProfile(id, input);
    setUser(updatedUser);
    setInput(initialInput);
    handleClose();
  };

  const handleUndo = () => {
    const preview = document.querySelector("#image-preview");
    preview.src = user?.avatar;
    setInput((prev) => ({ ...prev, file: null }));
  };

  const handleDialog = (id) => {
    setIcon(id);
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
          initialInput={initialInput}
          icon={icon}
          input={input}
          open={dialog}
          setOpen={setDialog}
          setInput={setInput}
        />
        <Grid container className={classes.connections}>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(1)}
              sx={
                initialInput.socials[0].url ? { opacity: 1 } : { opacity: 0.2 }
              }
            >
              <SteamSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(2)}
              sx={
                initialInput.socials[1].url ? { opacity: 1 } : { opacity: 0.2 }
              }
            >
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(3)}
              sx={
                initialInput.socials[2].url ? { opacity: 1 } : { opacity: 0.2 }
              }
            >
              <RiotGamesSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(4)}
              sx={
                initialInput.socials[3].url ? { opacity: 1 } : { opacity: 0.2 }
              }
            >
              <EpicGamesSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(5)}
              sx={
                initialInput.socials[4].url ? { opacity: 1 } : { opacity: 0.2 }
              }
            >
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(6)}
              sx={
                initialInput.socials[5].url ? { opacity: 1 } : { opacity: 0.2 }
              }
            >
              <RiotGamesSvg />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
    </Dialog>
  );
}
