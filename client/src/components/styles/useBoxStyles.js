import { makeStyles, createStyles } from "@mui/styles";

export const useBoxStyles = makeStyles((theme) =>
  createStyles({
    root: { display: "flex", width: "100%", height: "100%" },
    navBox: { display: "flex", width: "100%" },
    friendListBox: {
      width: "31em",
      display: "flex",
      flexDirection: "column",
    },
    connections: {
      display: "flex",
      width: "100%",
      justifyContent: "space-evenly",
    },
    displayColumn: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: "1.5em",
    },
    homeWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      width: "100%",
      // margin: "2em 3em",
    },
    friendProfileWrapper: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
      height: "100%",
    },
    friendsBar: {
      backgroundColor: "inherit",
      color: "#FFF",
      width: "100%",
      backgroundColor: "#040B0C",
      height: "4em",
      borderRadius: "1em",
      marginBottom: "1em",
    },
  })
);
