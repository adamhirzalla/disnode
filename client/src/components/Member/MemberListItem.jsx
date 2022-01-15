import * as React from "react";
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

const mockMembers = [
  {
    id: 1,
    role: "Owner",
    name: "Adam",
    img: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    online: true,
  },
  {
    id: 2,
    role: "Admin",
    name: "Jonathan",
    img: "https://static8.depositphotos.com/1008939/939/i/600/depositphotos_9394698-stock-photo-lonely-man.jpg",
    online: true,
  },
  {
    id: 3,
    role: "Mod",
    name: "Hyunsu",
    img: "https://photolemur.com/uploads/blog/unnamed.jpg",
    online: false,
  },
  {
    id: 4,
    role: "Mod",
    name: "Ted",
    img: "https://i1.sndcdn.com/artworks-HgiHqHrCBnVFJmok-s39fqQ-t500x500.jpg",
    online: false,
  },
  {
    id: 5,
    role: "User",
    name: "Jono",
    img: "https://wl-brightside.cf.tsp.li/resize/728x/jpg/6f5/d79/6c2d4457e7b227254fbc0f51b8.jpg",
    online: true,
  },
  { id: 6, role: "User", name: "Lulu", img: "", online: true },
  {
    id: 7,
    role: "User",
    name: "Lala",
    img: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    online: false,
  },
];
const UserList = styled(Box)(({ open }) => ({
  width: "100%",
  height: "auto",
  ...(open
    ? { textAlign: "start", marginLeft: "20px" }
    : { textAlign: "center" }),
}));

const Role = styled(Box)(({ open }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  margin: "8px",
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
  const parsedMembers = mockMembers.map((member) => {
    return (
      <Box key={member.id}>
        <Role open={open}>
          <Typography>{member.role}</Typography>
        </Role>

        <UserList onClick={handleDrawerOpen} open={open}>
          <StyledBox component="span" open={open} sx={{ display: "flex" }}>
            <StyledBadge
              overlap="circular"
              open={open}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={member.online ? "dot" : "standard"}
              sx={{ ...(open && { "& .MuiBadge-badge": { right: 43 } }) }}
            >
              <Avatar alt={member.name} src={member.img} />{" "}
            </StyledBadge>{" "}
            <UserName primary={member.name} open={open} />
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
