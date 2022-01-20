import { makeStyles, createStyles } from "@mui/styles";

export const useDisIconButtonStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    home: { opacity: "0.5", "&:hover": { opacity: "1" } },
    connections: { width: "50px", height: "50px" },
    selected: {
      // background: "rgb(182, 185, 181, 0.5)",
      opacity: "1",
    },
  })
);
