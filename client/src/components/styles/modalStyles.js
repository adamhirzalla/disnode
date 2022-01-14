import { makeStyles, createStyles } from "@mui/styles";

export const modalStyles = makeStyles((theme) =>
  createStyles({
    addButton: {
      color: "",
      backgroundColor: "inherit",
      "&:hover": {
        color: "gray",
        backgroundColor: "inherit",
      },
    },
  })
);
