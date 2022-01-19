import { makeStyles, createStyles } from "@mui/styles";

export const useHomePageStyles = makeStyles((theme) =>
  createStyles({
    rootTwo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      width: "100%",
      zIndex: 99,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      width: "10em",
      justifyContent: "space-evenly",
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    button: {
      width: "3em",
    },
    Typograghy: {},
    rowTwo: {
      display: "flex",
      flexDirection: "row",
    },
    chatIconButton: {
      marginLeft: "30em",
      marginTop: "9em",
      width: "12em",
      height: "12em",
      "&:hover": {
        // backgroundColor: "gray",
      },
    },
    chatIcon: {
      height: "10em",
      width: "10em",
    },
  })
);
