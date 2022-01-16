import { makeStyles, createStyles } from "@mui/styles";

export const useServerListItemStyles = makeStyles((theme) =>
  createStyles({
    selected: {
      background: "rgb(182, 185, 181, 0.5)",
    },
    default: {},
  })
);
