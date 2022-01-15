import { makeStyles, createStyles } from "@mui/styles";

export const tagUseStyles = makeStyles((theme) =>
  createStyles({
    serverList: {
      flexShrink: 0,
    },
    tag: {
      backgroundColor: "#FFFFFF",
      "&:hover": {
        color: "gray",
        backgroundColor: "#4D8F42",
      },
    },
    "& .MuiChip-root": {},
  })
);
