import { React } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import ElipsesDropdown from "../ElipsesDropDown";

export default function FriendsListItem({ id, name, img, labelId }) {
  return (
    <ListItem
      key={id}
      secondaryAction={<ElipsesDropdown disableRipple disableFocusRipple />}
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={name} src={img} />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
