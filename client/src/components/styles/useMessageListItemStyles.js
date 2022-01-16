import { makeStyles, createStyles } from "@mui/styles";

export const useMessageListItemStyles = makeStyles((theme) =>
  createStyles({
    messageText: {
      "&.MuiListItemText-multiline": {
        // display: "flex",
        // flexWrap: "wrap",
      },
    },
  })
);
