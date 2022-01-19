import { makeStyles, createStyles } from "@mui/styles";

export const useMessageListItemStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "flex-start",
      margin: "0.7em 0",
      height: "auto",
    },
    avatar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0.5em 0",
    },
    messages: {
      height: "auto",
      wordBreak: "break-word",
      // padding: 10,
      borderRadius: 20,
      color: "white",
      backgroundColor: "black",
      padding: "1em 1em",
    },
    messageText: {
      "&.MuiListItemText-multiline": {
        // display: "flex",
        // flexWrap: "wrap",
      },
    },
  })
);
