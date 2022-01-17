import { makeStyles, createStyles } from "@mui/styles";

export const useHomeNavStyles = makeStyles((theme) =>
  createStyles({
    navButton: {
      my: 2,
      color: "white",
      display: "block",
      fontWeight: "550",
      "&:hover": {
        color: "#d40824",
      },
    },
    box: {
      flexGrow: 1,
      flexDirection: "row",
      display: "flex",
      xs: "none",
    },
    boxOne: {
      display: "flex",
      flexGrow: "0.3",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    boxTwo: {
      flexGrow: 0,
      backgroundColor: "#d40824",
      borderRadius: "1em",
      "&:hover": { backgroundColor: "#4D8F42" },
    },
    typography: {
      mr: 2,
      display: "flex",
    },
    appBar: {
      backgroundColor: "#01040D",
      height: "4.2em",
    },
    avatarMenu: {
      marginTop: "2.5em",
    },
  })
);
