import { styled } from "@mui/material/styles";
import ElipsesDropdown from "../ElipsesDropDown";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// styles
const useStyles = makeStyles(() => ({
  avatar: {
    width: "3em",
    height: "3em",
  },
  list: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "5em",
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
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

export default function FriendsListItem({
  id,
  name,
  img,
  labelId,
  variant,
  onClick,
  setFriend,
}) {
  const classes = useStyles();

  return (
    <ListItem key={id} secondaryAction={<ElipsesDropdown />} disablePadding>
      <ListItemButton className={classes.list} onClick={onClick}>
        <ListItemAvatar>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={variant}
            sx={{
              "& .MuiBadge-badge": {
                right: 10,
                width: "1em",
                height: "1em",
                borderRadius: "1em",
              },
            }}
          >
            <Avatar alt={name} src={img} className={classes.avatar} />
          </StyledBadge>
        </ListItemAvatar>
        <ListItemText className={classes.text} id={labelId} primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
