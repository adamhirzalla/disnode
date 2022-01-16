import { makeStyles, createStyles } from "@mui/styles";

export const useServerListItemStyles = makeStyles((theme) =>
  createStyles({
    selected: {
      backgroundColor: "green",
    },
    default: {},
  })
);
