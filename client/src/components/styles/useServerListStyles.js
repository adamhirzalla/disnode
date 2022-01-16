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
      },
    },
    divider: {
      marginTop: ".6em",
      width: "60%",
    },
  })
);
