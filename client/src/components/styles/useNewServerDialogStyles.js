import { makeStyles, createStyles } from "@mui/styles";

export const useNewServerDialogStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // color: "#FFFFFF",
      "& .MuiInputBase-root": {
        // width: "500px",
        // color: "#FFF", // or black
        textAlign: "center",
      },
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
    },
    dialogPaper: {
      display: "flex",

      alignItems: "center",
      borderRadius: "2em",
      // backgroundColor: "#040B0C",
      // color: "#FFFFFF",
      textAlign: "center",
      padding: "40px 20px",
      paddingTop: "25px",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
  })
);
