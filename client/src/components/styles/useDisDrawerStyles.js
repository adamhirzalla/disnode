import { makeStyles, createStyles } from "@mui/styles";

export const useDisDrawerStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    serverList: {
      width: "125px",
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: "122px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#040B0C",
      },
      "& .MuiDrawer-root": {
        height: "0",
        width: "100%",
      },
    },
    divider: {
      marginTop: ".6em",
      width: "60%",
      height: ".15em",
      backgroundColor: "#FFFFFF",
    },
    box: { display: "flex", width: "100%" },
  })
);
