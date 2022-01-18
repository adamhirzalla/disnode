import { React } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ElipsesDropdown from "../ElipsesDropDown";

// styles
import { useFriendsListItemStyles } from "../styles/useFriendListItemStyles";

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

export default function FriendsListItem({ id, name, img, labelId, variant }) {
  const classes = useFriendsListItemStyles();

  return (
    <ListItem key={id} secondaryAction={<ElipsesDropdown />} disablePadding>
      <ListItemButton className={classes.list}>
        <ListItemAvatar>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={variant}
            sx={{ "& .MuiBadge-badge": { right: 43 } }}
          >
            <Avatar alt={name} src={img} className={classes.avatar} />
          </StyledBadge>
        </ListItemAvatar>
        <ListItemText className={classes.text} id={labelId} primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
