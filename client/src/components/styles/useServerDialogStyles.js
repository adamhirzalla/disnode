import { makeStyles, createStyles } from "@mui/styles";

export const useServerDialogStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // color: "#FFFFFF",
      "& .MuiInputBase-root": {
        // width: "500px",
        // color: "#FFF", // or black
        textAlign: "center",
      },
    },
    avatar: {
      height: "50px",
      width: "50px",
    },
    addButton: {
      marginTop: "0.2em",
      color: "#FFFFFF",
      opacity: "0.8",
      // backgroundColor: "inherit",
      "&:hover": {
        opacity: "1",
        // color: "gray",
        // backgroundColor: "inherit",
      },
    },
    content: {
      // color: "#FFFFFF",
      width: "500px",
      paddingBottom: "42px",
      overflowY: "hidden",
    },
    dialogPaper: {
      display: "flex",
      height: "auto",
      maxHeight: "80%",
      alignItems: "center",
      borderRadius: "2em",

      textAlign: "center",
      padding: "40px",
      flexDirection: "column",
      justifyContent: "space-evenly",
      overflowY: "auto",
    },
    serverListpaper: {
      display: "flex",
      width: "100%",
      height: "auto",
      maxHeight: "50%",
      minHeight: "50%",
      borderRadius: "2em",
      textAlign: "center",
      padding: "10px",
      paddingBottom: 0,
    },
    dialogPaperRequest: {
      display: "flex",
      height: "35%",
      width: "30%",
      maxHeight: "80%",
      alignItems: "center",
      borderRadius: "2em",
      textAlign: "center",
      padding: "40px",
      paddingTop: "0px",
      flexDirection: "column",
      justifyContent: "space-evenly",
      overflowY: "auto",
    },
  })
);
