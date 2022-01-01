import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  width: "400px",
};

export default function AddMemberBar(props) {
  return (
    <Box sx={style}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.name}
          </Typography>
          <Button color="inherit">{props.icon}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
