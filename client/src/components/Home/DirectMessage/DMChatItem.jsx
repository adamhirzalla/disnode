import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { DMTextInput } from "./DMTextInput";
import { DMMessageLeft, DMMessageRight } from "./DMMessage";
import { makeStyles } from "@mui/styles";
import DMChatTitle from "./DMChatTitle";
import AuthContext from "../../../contexts/AuthContext";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  messages: { width: "75%", overflowY: "scroll", alignContent: "flex-start" },
  message: { "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" } },
  avatar: {},
  body: {},
  delete: {
    opacity: "0.4",
    "&:hover": { opacity: 1 },
  },
}));

export default function DMChatItem(props) {
  const classes = useStyles();
  const { message } = props;

  const {
    state: { user: user_id },
  } = useContext(AuthContext);

  return (
    <ListItem className={classes.message}>
      <ListItemAvatar className={classes.avatar}>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={message.body}
        secondary={message.sent_at}
        className={classes.body}
      />
      <IconButton aria-label="delete" className={classes.delete} disableRipple>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
