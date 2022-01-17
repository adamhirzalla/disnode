import { React, useState } from "react";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import FriendsListItem from "./FriendsListItem";

// styles
import { useFriendsStyles } from "../styles/useFriendsStyles";

export default function FriendsList({ friendList }) {
  const classes = useFriendsStyles();

  // useState
  const [checked, setChecked] = useState([1]);

  // func
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // parses friends list for friend list items
  const parsedFriendList = friendList.map((friend) => {
    const labelId = `label-${friend.id}`;
    return (
      <FriendsListItem
        name={friend.name}
        labelId={labelId}
        id={friend.id}
        img={friend.img}
      />
    );
  });

  return (
    <Box className={classes.box}>
      <List className={classes.list}>{parsedFriendList}</List>
    </Box>
  );
}
