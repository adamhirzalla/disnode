import { React, useState } from "react";
import { Box } from "@mui/system";
import { AppBar, List, Typography } from "@mui/material";
import FriendsListItem from "./FriendsListItem";

// styles
import { useFriendsListStyles } from "../styles/useFriendsListStyles";
import SearchBar from "./SearchBar";

export default function FriendsList({ friendList }) {
  const classes = useFriendsListStyles();

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
        className={classes.listItem}
        name={friend.full_name}
        labelId={labelId}
        id={friend.id}
        img={friend.img}
      />
    );
  });

  return (
    <Box className={classes.box}>
      <SearchBar></SearchBar>
      <List className={classes.list}>{parsedFriendList}</List>
    </Box>
  );
}
