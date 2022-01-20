import { makeStyles, createStyles } from "@mui/styles";

export const useMessageListStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
    },
    channelList: {
      display: "flex",
      justifyContent: "center",
    },
    channel: {
      width: "90%",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: 3,
      height: "3em",
    },
    typography: {
      marginTop: "0em",
      fontSize: "1.5em",
    },
    message: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "75vh",
      overflowY: "scroll",
      overflowX: "hidden",
      borderRadius: 10,

      "&::-webkit-scrollbar": {
        width: "0.5em",
        borderRadius: "30px",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgb(0,0,0,0.3)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(0,0,0,0.4)",
        // outline: "1px solid black",
        borderRadius: "30px",
      },
    },

    scrollIcon: {
      position: "fixed",
      bottom: 230,
      right: 230,
      color: "rgb(0,0,0,0.8)",
      zIndex: 50,
    },

    // MessageForm style
    listItem: {
      display: "flex",
      justifyContent: "center",
    },
    form: {
      width: "50vw",
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      borderRadius: 20,
      backgroundColor: "black",
      marginTop: 20,
    },
    textField: {
      marginTop: 2,
      width: "85%",
      maxHeight: 100,
    },
    input: {
      color: "white",
    },
  })
);
// scrollbarWidth: "50px",
// "&::-webkit-scrollbar": {
//   width: "10px",
// },
// "&::-webkit-scrollbar-track": {
//   background: "#f1f1f1",
// },

// /* Handle */
// "&::-webkit-scrollbar-thumb": {
//   background: "#888",
// },

// /* Handle on hover */
// "&::-webkit-scrollbar-thumb:hover": {
//   background: "#555",
// },
// headBG: {
//   backgroundColor: "#e0e0e0",
// },
// borderRight500: {
//   borderRight: "1px solid #e0e0e0",
// },
// messageArea: {
//   height: "70vh",
//   overflowY: "auto",
// },
// root: {
//   width: "80vw",
// },
