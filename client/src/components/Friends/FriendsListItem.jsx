import { React } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import ElipsesDropdown from "../ElipsesDropDown";

// styles
import { useFriendsListItemStyles } from "../styles/useFriendListItemStyles";

export default function FriendsListItem({ id, name, img, labelId }) {
  const classes = useFriendsListItemStyles();

  return (
    <ListItem key={id} secondaryAction={<ElipsesDropdown />} disablePadding>
      <ListItemButton className={classes.list}>
        <ListItemAvatar>
          <Avatar
            className={classes.avatar}
            variant="circular"
            alt={name}
            src={img}
          />
        </ListItemAvatar>
        <ListItemText className={classes.text} id={labelId} primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
