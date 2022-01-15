import { makeStyles, createStyles } from "@mui/styles";

export const useAddMemberStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "375px",
      borderRadius: "8px",
      backgroundColor: "#c4c4c4",
      padding: "10px",
      maxHeight: "250px",
      overflowY: "scroll",
      overflowX: "hidden",
      marginTop: "15em",
      margin: "auto",
    },
    addButton: {
      color: "",
      backgroundColor: "inherit",
      "&:hover": {
        color: "gray",
        backgroundColor: "inherit",
      },
    },
    list: {
      padding: 0,
      marginTop: 0,
    },
    listItem: {
      listStyleType: "none",
      padding: "2px 8px",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
  })
);
