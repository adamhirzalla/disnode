import { makeStyles, createStyles } from "@mui/styles";

export const useServerListItemStyles = makeStyles((theme) =>
  createStyles({
    default: {
      opacity: "0.5",
      "&:hover": { opacity: "1" },
    },
    selected: {
      boxShadow: "inset 0px 0px 0px 2px white",
      opacity: "1",
    },
    center: {
      justifyContent: "center",
    },
  })
);
