import { makeStyles, createStyles } from "@mui/styles";

export const useDisDividerStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    topNav: {
      margin: "0em auto",
      width: "60%",
      height: ".2em",
      backgroundColor: "#FFFFFF",
      position: "sticky",
      top: "78px",
      zIndex: 1300,
    },
    botNav: {
      margin: "0 auto",
      width: "60%",
      height: ".2em",
      backgroundColor: "#FFFFFF",
      position: "sticky",
      bottom: "112px",
      zIndex: 1301,
    },
  })
);
