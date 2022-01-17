import { makeStyles, createStyles } from "@mui/styles";

export const useSearchBarStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      backgroundColor: "inherit",
      color: "black",
    },
    search: {
      backgroundColor: "#01040D",
      color: "#FFF",
      borderRadius: ".7em",

      "&:hover": {
        backgroundColor: "#01040D",
        color: "#FFF",
      },
    },
  })
);
