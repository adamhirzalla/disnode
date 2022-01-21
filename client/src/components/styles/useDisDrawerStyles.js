import { makeStyles, createStyles } from "@mui/styles";

export const useDisDrawerStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    serverList: {
      flexShrink: 0,
      "& .MuiDrawer-root": {
        height: "0",
        width: "5%",
      },
      "& .MuiDrawer-paper": {
        overflowX: "hidden",
        width: "90px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#040B0C",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "0em",
          borderRadius: "30px",
        },
        "&::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgb(0,0,0,0)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(0,0,0,0)",
          // outline: "1px solid black",
          borderRadius: "30px",
        },
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
