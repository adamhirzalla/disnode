import { makeStyles, createStyles } from "@mui/styles";

export const useFriendsListStyles = makeStyles((theme) =>
  createStyles({
    box: {
      width: "26em",
      display: "flex",
      flexDirection: "column",
    },
    list: {
      width: "100%",
      maxWidth: "360",
      backgroundColor: "inherit",
    },
    listItem: {
      "&:hover": {
        backgroundColor: "inherit",
      },
    },
    appBar: {
      backgroundColor: "inherit",
      color: "black",
      // display: "flex",
      // justifyContent: "center",
    },
  })
);
