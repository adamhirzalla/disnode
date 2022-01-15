import { makeStyles, createStyles } from "@mui/styles";

export const buttonStyles = makeStyles((theme) =>
  createStyles({
    contained: {
      color: "white",
      borderRadius: ".8em",
      backgroundColor: "#4D8F42",
      "&:hover": {
        backgroundColor: "#5F9157",
      },
    },
    text: {
      color: "#4D8F42",
      borderRadius: ".8em",
      border: "1px solid #4D8F42",
    },
  })
);
