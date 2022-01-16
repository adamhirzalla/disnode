import { useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Badge,
  Avatar,
  IconButton,
  Typography,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import ServerContext from "../../contexts/ServerContext";

const UserList = styled(Box)(({ open }) => ({
  width: "100%",
  height: "auto",
  ...(open
    ? { textAlign: "start", marginLeft: "20px" }
    : { textAlign: "center" }),
}));

const Role = styled(Box)(({ open }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "10px 0",
}));

const UserName = styled(ListItemText)(({ open }) => ({
  ...(open ? { marginLeft: "20px" } : { margin: "none" }),
}));

const StyledBox = styled(Box)(({ open }) => ({
  width: "100%",
  height: "auto",
  ...(open
    ? {
        display: "flex",
        alignContent: "center",
      }
    : {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }),
}));

const StyledBadge = styled(Badge)(({ theme, open }) => ({
  display: "flex",
  justifyContent: "center",
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    ...(open ? { left: 30 } : { right: 43 }),
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

export default function MemberListItem({ open, handleDrawerOpen }) {
  const {
    app: { members },
  } = useContext(ServerContext);
  const parsedMembers = members.map((member) => {
    return (
      <Box key={member.id}>
        <Role open={open}>
          <Typography variant="button">{member.role}</Typography>
        </Role>

        <UserList onClick={handleDrawerOpen} open={open}>
          <StyledBox component="span" open={open} sx={{ display: "flex" }}>
            <StyledBadge
              overlap="circular"
              open={open}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={member.is_active ? "dot" : "standard"}
              sx={{ ...(open && { "& .MuiBadge-badge": { right: 43 } }) }}
            >
              <Avatar alt={member.nickname} src={member.avatar} />{" "}
            </StyledBadge>{" "}
            <UserName primary={member.nickname} open={open} />
            {open && (
              <IconButton sx={{ right: "60px" }}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </IconButton>
            )}
          </StyledBox>
        </UserList>
      </Box>
    );
  });

  return <>{parsedMembers}</>;
}
