import { makeStyles, createStyles } from "@mui/styles";

export const useButtonStyles = makeStyles((theme) =>
  createStyles({
    contained: {
      color: "white",
      borderRadius: ".8em",
      backgroundColor: "#7a211b",
      "&:hover": {
        backgroundColor: "#635c5b",
      },
    },
    text: {
      color: "#7a211b",
      borderRadius: ".8em",
      border: "1px solid #7a211b",
    },
  })
);
