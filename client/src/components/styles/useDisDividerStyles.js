import { makeStyles, createStyles } from "@mui/styles";

export const useDisDividerStyles = makeStyles((theme) =>
  createStyles({
    root: { width: "100%" },
    serverList: {
      marginTop: ".6em",
      width: "60%",
      height: ".15em",
      backgroundColor: "#FFFFFF",
    },
  })
);