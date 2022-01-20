import { makeStyles, createStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";

export const useMemberListItemStyles = makeStyles((theme) =>
  createStyles({
    member: {
      width: "100%",
      height: "auto",
      textAlign: "center",
    },
    role: {
      display: "flex",
      justifyContent: "center",
      padding: "10px 0",
    },
    memberIcon: {
      width: "100%",
      borderRadius: 10,
      "&:hover": {
        backgroundColor: "rgb(182, 185, 181, 0.5)",
        transition: `backgroundColor 150ms rgb(0.4, 0, 0.2, 1) 50ms`,
        cursor: "pointer",
      },
    },
    userBadge: {
      display: "flex",
      justifyContent: "center",
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
    },
    memberList: {
      width: "100%",
      height: "auto",
      textAlign: "center",
    },
    memberListOpen: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },
  })
);

export const StyledBadge = styled(Badge)({
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
});
