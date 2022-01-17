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
      left: "4em",
    },
    icon: {
      // borderRadius: ".8em",
      backgroundColor: "inherit",
      "&:hover": {
        color: "blue",
        backgroundColor: "inherit",
      },
      // marginLeft: "2em",
    },
  })
);
