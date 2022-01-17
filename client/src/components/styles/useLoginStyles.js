import { makeStyles, createStyles } from "@mui/styles";

export const useLoginStyles = makeStyles((theme) =>
  createStyles({
    main: {
      height: "100vh",
      width: "80vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    section: {
      height: "50%",
      width: "60%",
      padding: "80px",
      border: `1px solid black`,
      borderRadius: 80,
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 30,
    },
    TextField: {
      "& fieldset": {
        borderRadius: 30,
      },
      "& input": {
        paddingLeft: 30,
        fontSize: 18,
      },
      "& label": {
        marginLeft: 10,
      },
    },
  })
);
