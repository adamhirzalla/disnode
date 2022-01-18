import { makeStyles, createStyles } from "@mui/styles";

export const useFriendsListItemStyles = makeStyles((theme) =>
  createStyles({
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
  })
);
