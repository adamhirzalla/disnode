import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = "122px";

export const useServerListStyles = makeStyles((theme) =>
  createStyles({
    serverList: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#040B0C",
      },
    },
    divider: {
      marginTop: ".6em",
      width: "60%",
      height: ".15em",
      backgroundColor: "#FFFFFF",
    },
  })
);
