import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import SelectButton from "./SelectButton";
import { makeStyles, createStyles } from "@mui/styles";
import UserConnection from "./UserConnection";
import UserForm from "./UserForm";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";

export const useUserInfoDialogStyles = makeStyles((theme) =>
  createStyles({
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
  })
);

export default function UserInfoDialog({ open, setOpen }) {
  const classes = useUserInfoDialogStyles();
  const {
    state: { user },
  } = useContext(AuthContext);
  const { avatar } = user;

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    console.log("Edit");
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
          <SelectButton
          // setFile={setFile}
          />
        </Box>

        {/* full name, nickname, bio form*/}
        <UserForm />

        {/* connection form */}
        <UserConnection />

        <Grid container>
          <Grid item xs={3}>
            <EpicGamesSvg />
          </Grid>
          <Grid item xs={3}>
            <EpicGamesSvg />
          </Grid>
          <Grid item xs={3}>
            <EpicGamesSvg />
          </Grid>
          <Grid item xs={3}>
            <EpicGamesSvg />
          </Grid>
          <Grid item xs={3}>
            <EpicGamesSvg />
          </Grid>
          <Grid item xs={3}>
            <EpicGamesSvg />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </DialogActions>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
    </Dialog>
  );
}
