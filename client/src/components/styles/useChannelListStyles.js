import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = 240;

export const useChannelListStyles = makeStyles((theme) =>
  createStyles({
    list: {
      paddingTop: "0",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        marginLeft: "122px",
        width: drawerWidth,
        boxSizing: "border-box",
      },
    },
    box: { display: "flex" },
  })
);
