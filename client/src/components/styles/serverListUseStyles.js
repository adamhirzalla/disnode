import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = "122px";

export const serverListUseStyles = makeStyles((theme) =>
  createStyles({
    serverList: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    },
  })
);
