import { useContext, useState } from "react";
import ServerContext from "../../contexts/ServerContext";
import { makeStyles } from "@mui/styles";
import { Button, Dialog, DialogActions, List, Paper } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
import DisBox from "../Box/DisBox";
import SearchBar from "./SearchBar";

// mock data
const friendList = [
  {
    id: 1,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: true,
    username: "Learth",
    bio: "Hi, we are disnode!",
  },
  {
    id: 2,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: true,
    username: "smart lad",
    bio: "Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! Hi, we are disnode! ",
  },
  {
    id: 3,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: true,
  },
  {
    id: 4,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: true,
  },
  {
    id: 5,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: true,
  },
  {
    id: 6,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 7,
    full_name: "HyunSu Kim",
    img: "/images/avatar2.jpg",
    is_active: false,
  },
  {
    id: 8,
    full_name: "Jonathan Su",
    img: "/images/avatar.jpg",
    is_active: false,
  },
  {
    id: 9,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 10,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 11,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 12,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 13,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 14,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 15,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
  {
    id: 16,
    full_name: "Adam Hirzalla",
    img: "/images/avatar3.jpg",
    is_active: false,
  },
];

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

  const parsedFriendList = friendList.map((friend) => {
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
