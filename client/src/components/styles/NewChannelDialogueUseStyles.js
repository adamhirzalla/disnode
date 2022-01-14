import { makeStyles, createStyles } from "@mui/styles";

export const NewChannelDialogueUseStyles = makeStyles((theme) =>
  createStyles({
    addButton: {
      color: "",
      backgroundColor: "inherit",
      "&:hover": {
        color: "gray",
        backgroundColor: "inherit",
      },
    },
    root: {
      color: "#FFFFFF",
      "& .MuiInputBase-root": {
        width: "500px",
        color: "#FFF", // or black
        textAlign: "center",
      },
    },
    content: {
      color: "#FFFFFF",
      width: "500px",
      paddingBottom: "42px",
    },
    dialogPaper: {
      display: "flex",

      alignItems: "center",
      borderRadius: "3em",
      backgroundColor: "#040B0C",
      color: "#FFFFFF",
      textAlign: "center",
      padding: "50px 0px",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
  })
);
