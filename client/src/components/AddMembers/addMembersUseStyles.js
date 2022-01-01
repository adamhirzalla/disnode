import { makeStyles, createStyles } from "@mui/styles";

export const addMembersUseStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "375px",
      borderRadius: "8px",
      backgroundColor: "#c4c4c4",
      padding: "10px",
      height: "150px",
      overflowY: "scroll",
      overflowX: "hidden",
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
