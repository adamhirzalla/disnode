import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = 240;

export const useMemberListStyles = makeStyles((theme) =>
  createStyles({
    list: {
      paddingTop: "0",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    default: {
      "& .MuiDrawer-root": {
        height: "0vh",
        width: "100%",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        marginLeft: "122px",
        width: drawerWidth,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      },
    },
    box: { display: "flex", width: "100%" },
  })
);
