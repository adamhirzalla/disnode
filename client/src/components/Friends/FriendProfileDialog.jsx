import { useContext, useState } from "react";
import ServerContext from "../../contexts/ServerContext";
import { makeStyles } from "@mui/styles";
import { Button, Dialog, DialogActions, List } from "@mui/material";
import FriendProfile from "./FriendProfile";
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
];

// styles
const useStyles = makeStyles(() => ({
  addButton: {
    color: "black",
    backgroundColor: "inherit",
    "&:hover": {
      color: "gray",
      backgroundColor: "inherit",
    },
  },
  root: {
    color: "#FFFFFF",
    "& .MuiInputBase-root": {
      color: "#FFF",
      textAlign: "center",
    },
  },
  content: {
    color: "#FFFFFF",
    padding: "0 0",
  },
  dialogPaper: {
    display: "flex",
    alignItems: "center",
    borderRadius: "2em",
    backgroundColor: "#040B0C",
    color: "#FFFFFF",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  dialogTitle: { padding: "0 0", margin: "0 0" },
  dialog: { padding: "0 0", margin: "0 0" },
  avatar: {
    width: "5em",
    height: "5em",
  },
  dialogActions: { flexDirection: "row", justifyContent: "center" },
  closeDialog: {
    color: "white",
    borderRadius: ".8em",
    backgroundColor: "#7a211b",
    width: "20%",
    "&:hover": {
      background: "rgb(179, 2, 2, 0.5)",
    },
  },
  list: {
    width: "100%",
    maxWidth: "360",
    backgroundColor: "inherit",
  },
}));

export default function FriendProfileDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [friend, setFriend] = useState("");
  const {
    app: { server },
  } = useContext(ServerContext);

  const handleFriendClick = async () => {
    // const friend = await setFriend(id);
    // setFriend(friend);
  };

  const handleClickOpen = () => {
    setOpen((prev) => true);
    handleFriendClick();
  };

  const handleClose = () => {
    setOpen((prev) => false);
    setFriend((prev) => "");
  };

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
        onClick={handleClickOpen}
        // setFriend={setFriend}
      />
    );
  });

  return (
    <div>
      <DisBox disStyle="friendListBox">
        <SearchBar></SearchBar>
        <List className={classes.list}>{parsedFriendList}</List>
      </DisBox>
      <Dialog
        className={classes.dialog}
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <FriendProfile user={friendList[1]}>
          <DialogActions className={classes.dialogActions}>
            <Button className={classes.closeDialog} onClick={handleClose}>
              close
            </Button>
          </DialogActions>
        </FriendProfile>
      </Dialog>
    </div>
  );
}
