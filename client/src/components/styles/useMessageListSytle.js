import { makeStyles, createStyles } from "@mui/styles";

export const useMessageListSytle = makeStyles(() =>
  createStyles({
    channel: {
      width: "90%",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: 3,
    },
    message: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "75vh",
      overflowY: "scroll",
      borderRadius: 10,
    },
    avatar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: 20,
    },
    messages: {
      height: "auto",
      wordBreak: "break-word",
      padding: 10,
      borderRadius: 20,
      color: "white",
      backgroundColor: "black",
    },

    form: {
      width: "50vw",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      color: "white",
      borderRadius: 50,
      backgroundColor: "black",
      marginTop: 20,
    },
    textField: {
      width: "100%",
      maxHeight: 70,
    },
    input: {
      color: "white",
    },
  })
);
