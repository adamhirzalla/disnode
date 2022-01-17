import { makeStyles, createStyles } from "@mui/styles";

export const useLoginStyles = makeStyles((theme) =>
  createStyles({
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
