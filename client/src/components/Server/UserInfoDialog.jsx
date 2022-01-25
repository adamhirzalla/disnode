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
import { SET_REQUESTS } from "../../utils/constants";

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

export default function UserInfoDialog({ open, setOpen, icons }) {
  const {
    state: { user },
    setUser,
    dispatch,
  } = useContext(AuthContext);
  const { id, avatar, full_name, nickname, bio, socials } = user;
  // const initialInput = {
  //   avatar,
  //   full_name,
  //   nickname,
  //   bio,
  //   1: socials.find((social) => social.id === 1)?.url || "",
  //   2: socials.find((social) => social.id === 2)?.url || "",
  //   3: socials.find((social) => social.id === 3)?.url || "",
  //   4: socials.find((social) => social.id === 4)?.url || "",
  //   5: socials.find((social) => social.id === 5)?.url || "",
  //   6: socials.find((social) => social.id === 6)?.url || "",
  // };

  const initialInput = {
    avatar,
    full_name,
    nickname,
    bio,
    socials,
  };
  const [file, setFile] = useState(null);
  const [input, setInput] = useState(initialInput);
  const [iconId, setIconId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    // setInput(initialInput);
    setOpen(false);
    setTimeout(() => {
      setInput(initialInput);
    }, 500);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);
    let logo;
    if (file) [logo] = await uploadtoS3(formData);
    const data = file ? { ...input, avatar: logo } : input;
    const updatedUser = await updateProfile(data, user.id);
    await setUser(updatedUser);
    dispatch({ type: SET_REQUESTS, requests: updatedUser.requests });
    setOpen(false);
    // setInput({});
    // handleClose();
  };

  // const handleSave = async () => {
  //   for (let i = 1; i <= 6; i++) {
  //     if (initialInput[i]?.url && initialInput[i]?.url === input[i]?.url) {
  //       input[i] = null;
  //     } else if (!initialInput[i]?.url && !input[i]?.url) {
  //       input[i] = null;
  //     } else if (!initialInput[i]?.url && input[i]?.url) {
  //       input[i].status = "create";
  //     } else if (initialInput[i]?.url && !input[i]?.url) {
  //       input[i].status = "delete";
  //     } else if (
  //       initialInput[i]?.url &&
  //       initialInput[i]?.url !== input[i]?.url
  //     ) {
  //       input[i].status = "edit";
  //     }
  //   }
  //   await updateUser();
  //   setInput(initialInput);
  // };

  // const updateUser = async () => {
  //   const formData = new FormData();
  //   formData.append("image", initialInput.file);
  //   const [logo] = await uploadtoS3(formData);

  //   const updatedUser = await updateProfile(input);
  //   await setUser(updatedUser);
  //   setInput({});
  //   handleClose();
  // };

  const handleUndo = () => {
    const preview = document.querySelector("#image-preview");
    preview.src = user?.avatar;
    setFile(null);
  };

  const handleDialog = (iconId) => {
    setIconId(iconId);
    const url = input.socials.find((s) => s.id === iconId)?.url;
    setUrl(url || "");
    setDialog(true);
  };

  // const iconClasses = classNames(classes.empty, {
  //   [classes.filled]: input.socials.
  // })

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
          <SelectButton setFile={setFile} />
          <Button color="error" onClick={handleUndo}>
            Undo
          </Button>
        </Box>

        {/* full name, nickname, bio form*/}
        <UserForm input={input} setInput={setInput} />

        {/* connection form */}
        {/* <UserConnection /> */}
        <ConnectionsDialog
          // initialInput={initialInput}
          // social={iconId}
          input={input}
          open={dialog}
          iconId={iconId}
          setOpen={setDialog}
          setInput={setInput}
          url={url}
          setUrl={setUrl}
        />
        <Grid container className={classes.connections}>
          {/* {icons.map((icon, i) => {
            const { id } = icon;
            return (
              <Grid item xs={4} key={id}>
                <IconButton
                  onClick={() => handleDialog(id)}
                  sx={
                    input?.socials[id]?.url ? { opacity: 1 } : { opacity: 0.2 }
                  }
                >
                  {id === 1 ? (
                    <SteamSvg />
                  ) : id === 2 ? (
                    <TwitterSvg />
                  ) : id === 3 ? (
                    <RiotGamesSvg />
                  ) : id === 4 ? (
                    <EpicGamesSvg />
                  ) : id === 5 ? (
                    <TwitterSvg />
                  ) : (
                    <RiotGamesSvg />
                  )}
                </IconButton>
              </Grid>
            );
          })} */}
          {/* 
{
  socials: [{id:1,url:"asdsad"}]
}
*/}
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(1)}
              sx={
                input.socials.find((e) => e.id == 1)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <SteamSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(2)}
              sx={
                input.socials.find((e) => e.id == 2)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(3)}
              sx={
                input.socials.find((e) => e.id == 3)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <RiotGamesSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(4)}
              sx={
                input.socials.find((e) => e.id == 4)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <EpicGamesSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(5)}
              sx={
                input.socials.find((e) => e.id == 5)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(6)}
              sx={
                input.socials.find((e) => e.id == 6)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
    </Dialog>
  );
}
