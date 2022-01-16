import { makeStyles, createStyles } from "@mui/styles";

export const useChannelListStyles = makeStyles((theme) =>
  createStyles({
    divider: {
      marginTop: ".6em",
      width: "60%",
    },
    listItem: {
      "&:hover": {},
      padding: "1em .5em",
    },
    selected: {
      background: "rgb(182, 185, 181, 0.5)",
    },
    default: {},
  })
);
