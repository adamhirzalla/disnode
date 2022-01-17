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
    typography: {
      mr: 2,
      display: "flex",
    },
    appBar: {
      backgroundColor: "#01040D",
      height: "4.2em",
    },
  })
);
