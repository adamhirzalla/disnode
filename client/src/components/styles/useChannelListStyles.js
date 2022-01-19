import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = 240;

export const useChannelListStyles = makeStyles((theme) =>
  createStyles({
    list: {
      paddingTop: "0",
      display: "flex",
      flexDirection: "column",
      width: "100%",
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
      "& .MuiDrawer-root": {
        height: "0",
        width: "100%",
      },
    },
  })
);
