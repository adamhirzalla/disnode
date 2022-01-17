import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ChatIconButton from "../Button/ChatIconButton";

//styles
import { useHomeNavStyles } from "../styles/useHomeNavStyles";

const HomeNav = (props) => {
  const classes = useHomeNavStyles();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static">
      <Container maxWidth="x1">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            className={classes.typography}
          >
            Home
          </Typography>
          <Box className={classes.box}>
            <Box className={classes.boxOne}>
              <Button key="1" onClick={null} className={classes.navButton}>
                Profile
              </Button>
              <Button key="2" onClick={null} className={classes.navButton}>
                Settings
              </Button>
              <ChatIconButton
                key="3"
                onClick={null}
                className={classes.navButton}
              />
            </Box>
          </Box>
          <Box className={classes.boxTwo}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  variant="circular"
                  alt={props.full_name}
                  src={props.img}
                />
              </IconButton>
            </Tooltip>
            <Menu
              className={classes.avatarMenu}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="1">
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HomeNav;
