import { useContext, useState } from "react";
import ServerContext from "../../../contexts/ServerContext";
import { makeStyles } from "@mui/styles";
import { Button, Dialog, DialogActions, List, Paper } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
import DisBox from "../../Box/DisBox";
import SearchBar from "./SearchBar";
import { friends } from "../mock";

// styles
const useStyles = makeStyles(() => ({
  list: {
    width: "100%",
    maxWidth: "360",
    backgroundColor: "inherit",
  },
}));

export default function FriendList(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [friend, setFriend] = useState(null);
  const {
    app: { server },
  } = useContext(ServerContext);

  const handleFriendClick = async () => {
    // const friend = await setFriend(id);
    // setFriend(friend);
  };

  const handleClickOpen = () => {
    setOpen((prev) => true);
    // handleFriendClick();
  };

  const handleClose = () => {
    setOpen((prev) => false);
    setFriend((prev) => null);
  };

  const parsedFriendList = friends.map((friend) => {
    return (
      <FriendsListItem key={friend.id} friend={friend} setFriend={setFriend} />
    );
  });

  return (
    <div>
      <DisBox disStyle="friendListBox">
        <SearchBar></SearchBar>
        <List className={classes.list}>{parsedFriendList}</List>
      </DisBox>
    </div>
  );
}
