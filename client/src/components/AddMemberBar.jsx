import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  width: "400px",
  borderRadius: 5,
  backgroundColor: "inherit",
  color: "black",
};

export default function AddMemberBar(props) {
  return (
    <Box>
      <AppBar sx={style} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.name}
          </Typography>
          <Button color="inherit">{props.icon}</Button>
        </Toolbar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.name}
          </Typography>
          <Button color="inherit">{props.icon}</Button>
        </Toolbar>
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
