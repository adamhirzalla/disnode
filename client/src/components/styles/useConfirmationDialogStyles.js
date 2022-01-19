import { makeStyles, createStyles } from "@mui/styles";

export const useConfirmationDialogStyles = makeStyles((theme) =>
  createStyles({
    dropDown: {
      color: "#7a211b",
      borderColor: "#7a211b",
      margin: "0",
      borderWidth: "2px",

      "&:hover": {
        borderColor: "#7a211b",
        background: "rgba(130, 5, 5, 0.8)",
        color: "#FFF",
        borderWidth: "2px",
      },
    },
  })
);
