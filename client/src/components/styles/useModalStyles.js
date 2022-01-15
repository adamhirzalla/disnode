import { makeStyles, createStyles } from "@mui/styles";

export const useModalStyles = makeStyles((theme) =>
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
