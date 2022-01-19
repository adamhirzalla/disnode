import DisBox from "../Box/DisBox";
import SearchBar from "./SearchBar";
import { List } from "@mui/material";
import FriendsListItem from "./FriendsListItem";

// styles
import { useFriendsListStyles } from "../styles/useFriendsListStyles";

export default function FriendsList({ friendList }) {
  const classes = useFriendsListStyles();

  // parses friends list for friend list items
  const parsedFriendList = friendList.map((friend) => {
    const labelId = `label-${friend.id}`;
    return (
      <FriendsListItem
        key={friend.id}
        className={classes.listItem}
        name={friend.full_name}
        labelId={labelId}
        id={friend.id}
        img={friend.img}
        variant={friend.is_active ? "dot" : "standard"}
      />
    );
  });

  return (
    <DisBox type="friendListBox">
      <SearchBar></SearchBar>
      <List className={classes.list}>{parsedFriendList}</List>
    </DisBox>
  );
}
