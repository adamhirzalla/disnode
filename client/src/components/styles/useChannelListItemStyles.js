import { makeStyles, createStyles } from "@mui/styles";

export const useChannelListStyles = makeStyles((theme) =>
  createStyles({
    divider: {
      marginTop: ".6em",
      width: "60%",
    },
    listItem: {
      margin: ".3em 0",
    },
    selected: {
      margin: ".3em 0",
      backgroundColor: "green",
    },
  })
);
