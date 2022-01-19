import { makeStyles, createStyles } from "@mui/styles";

export const useDisDividerStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    topNav: {
      margin: "0.3em auto",
      width: "60%",
      height: ".2em",
      backgroundColor: "#FFFFFF",
      position: "sticky",
      top: "82px",
      zIndex: 1300,
    },
    botNav: {
      margin: "0.3em auto",
      width: "60%",
      height: ".2em",
      backgroundColor: "#FFFFFF",
      position: "sticky",
      bottom: "106px",
      zIndex: 1300,
    },
  })
);
