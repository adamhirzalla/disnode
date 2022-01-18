import { makeStyles, createStyles } from "@mui/styles";

export const useElipsesDropDownStyles = makeStyles((theme) =>
  createStyles({
    contained: {
      listButton: "black",
      borderRadius: ".8em",
      backgroundColor: "inherit",
      "&:hover": {
        backgroundColor: "inherit",
      },
      left: "1em",
    },
    icon: {
      backgroundColor: "inherit",
      "&:hover": {
        color: "#4D8F42",
        backgroundColor: "inherit",
      },
    },
    popover: {
      marginTop: ".8em",
    },
  })
);
