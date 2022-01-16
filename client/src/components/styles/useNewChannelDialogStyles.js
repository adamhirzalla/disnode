import { makeStyles, createStyles } from "@mui/styles";

export const useNewChannelDialogStyles = makeStyles((theme) =>
  createStyles({
    addButton: {
      color: "black",
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
        color: "#FFF",
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
      borderRadius: "2em",
      backgroundColor: "#040B0C",
      color: "#FFFFFF",
      textAlign: "center",
      padding: "50px 0px",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    dialogTitle: { fontSize: "1.55em" },
  })
);
