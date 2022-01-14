import React from "react";
import { Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/material";

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    background: "#000000",
    width: "100%",
  },
  root: {
    display: "flex",
    backgroundColor: "#000000",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

export default function MemberBar({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* app bar */}

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            DISNODE
          </Typography>
        </div>

        {/* links/list section */}
      </Drawer>
      {/* main content */}
      {/* <div className={classes.page}>{children}</div> */}
    </div>
  );
}
