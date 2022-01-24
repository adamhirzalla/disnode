import {
  Avatar,
  Typography,
  ListItemText,
  ListItem,
  Container,
  Box,
  List,
  styled,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
// import {
//   useMemberListItemStyles,
//   StyledBadge,
// } from "../styles/useMemberListItemStyles";
import classNames from "classnames";
import MemberMenu from "./MemberMenu";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Badge from "@mui/material/Badge";
import { Settings } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const useStyles = makeStyles({
  members: {
    // paddingTop: "0.5em",
  },
  member: {
    justifyContent: "center",
    cursor: "pointer",
    // borderBottom: "1px solid rgb(4,11,12,0.1)",
  },

  nickname: { paddingLeft: "2em", fontSize: "1em" },
  avatar: { width: "45px", height: "45px" },
  openedAvatars: {
    marginLeft: "0.8em",
  },
  divider: {
    width: "65%",
    margin: "auto auto",
  },
});

export default function MemberListItem(props) {
  const { member, open } = props;
  const [anchor, setAnchor] = useState(false);

  // const classes = useMemberListItemStyles(open);
  const classes = useStyles();
  const memberListClass = classNames(classes.member, {
    [classes.memberListOpen]: !open,
  });
  const avatarClasses = classNames(classes.avatar, {
    [classes.openedAvatars]: open,
  });
  // const badgeClass = classNames(classes.userBadge, {
  //   [classes.userBadgeOpen]: open,
  // });
  const handleAnchor = (e) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      {/* <Box className={classes.memberIcon}> */}

      <ListItem disableGutters className={memberListClass}>
        <Tooltip title={member.nickname} arrow placement="left">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={member.is_active ? "dot" : "standard"}
            onClick={handleAnchor}
          >
            <Avatar
              alt={member.nickname}
              src={member.avatar}
              className={avatarClasses}
            />
          </StyledBadge>
        </Tooltip>
        {open && (
          <>
            <ListItemText
              inset
              primary={member.nickname}
              className={classes.nickname}
              // sx={{ textAlign: "center" }}
            />
            <Tooltip title={"Options"}>
              <IconButton onClick={handleAnchor} sx={{ mr: "20px" }}>
                <Settings fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}

        {/* {open && ( */}
        <MemberMenu anchor={anchor} setAnchor={setAnchor} member={member} />
        {/* )} */}
      </ListItem>
      {/* </Box> */}
    </>
  );
}
