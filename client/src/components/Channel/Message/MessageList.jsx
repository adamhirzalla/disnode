import * as React from "react";
import { Box, TextField, Typography, Divider, IconButton } from "@mui/material";
import { useServerListStyles } from "../../styles/useServerListStyles";
import { green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MessageListItem from "./MessageListItem";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: "green",
      overflowY: "scroll",
    },
  })
);

export default function MessageList({ children }) {
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60%",
          height: "85vh",
          bgcolor: "gray",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            width: "40vw",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            bgcolor: "black",
            borderRadius: 3,
            position: "fixed",
            zIndex: 2,
          }}
        >
          <Typography
            component="span"
            sx={{
              width: "auto",
              height: "auto",
              color: "pink",
              pl: 2,
              pt: 1,
            }}
          >
            Channel Name : Valolant
          </Typography>
          <IconButton sx={{ mr: 1 }}>
            <AddCircleIcon sx={{ color: green[500] }}>add_circle</AddCircleIcon>
          </IconButton>
        </Box>

        <Box
          sx={{
            height: "90%",
            p: 5,
            pt: 0,
            mb: 20,
            mt: 10,
            width: "80%",
          }}
        >
          <MessageListItem />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "40vw",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              position: "fixed",
              bottom: 40,
              borderRadius: 5,
              bgcolor: "black",
            }}
          >
            <TextField
              autoFocus
              id="name"
              type="text"
              row="2"
              placeholder="Message"
              multiline
              InputProps={{
                className: classes.root,
              }}
              sx={{
                width: "100%",
                color: "white",
                pl: "10px",
                pr: "10px",
                maxHeight: "200px",
              }}
            />
          </Box>
        </Box>
      </Box>
      {children}
    </>
  );
}
