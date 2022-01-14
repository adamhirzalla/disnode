import { makeStyles, createStyles } from "@mui/styles";

export const buttonUseStyles = makeStyles((theme) =>
  createStyles({
    contained: {
      color: "white",
      borderRadius: ".8em",
      backgroundColor: "#4D8F42",
    },
    text: {
      color: "#4D8F42",
      borderRadius: ".8em",
    },
  })
);
