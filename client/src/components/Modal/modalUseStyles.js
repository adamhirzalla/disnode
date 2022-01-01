import { makeStyles, createStyles } from "@mui/styles";

export const modalUseStyles = makeStyles((theme) =>
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
