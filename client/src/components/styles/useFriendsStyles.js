import { makeStyles, createStyles } from "@mui/styles";

export const useFriendsStyles = makeStyles((theme) =>
  createStyles({
    box: {
      width: "22em",
    },
    list: {
      width: "100%",
      maxWidth: "360",
      backgroundColor: "inherit",
    },
  })
);
