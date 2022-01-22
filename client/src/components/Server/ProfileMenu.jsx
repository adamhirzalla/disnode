import { Avatar, IconButton, Menu, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import ProfileMenuItem from "./ProfileMenuItem";

const useStyles = makeStyles({
  profile: {
    boxShadow: "inset 0px 0px 0px 5px #B13737",
    opacity: "0.8",
    width: "50px",
    height: "50px",
    "&:hover": { opacity: "1" },
  },
});

export default function ProfileMenu() {
  const [anchor, setAnchor] = useState(false);
  const {
    state: { user },
  } = useContext(AuthContext);

  const classes = useStyles();

  const handleClose = () => {
    setAnchor(false);
  };

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <Tooltip
        title={user.nickname}
        arrow
        placement="right"
        className={classes.navHome}
      >
        <IconButton onClick={handleClick}>
          <Avatar className={classes.profile} src={user.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "5px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <ProfileMenuItem setAnchor={setAnchor} user={user} />
      </Menu>
    </>
  );
}
