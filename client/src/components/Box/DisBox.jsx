import { Box } from "@mui/system";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: { display: "flex", width: "100%", height: "100%" },
  navBox: {
    display: "flex",
    flexDirection: "column",
    width: "5%",
    overflowX: "hidden",
  },
  friendListBox: {
    width: "510px",
    display: "flex",
    flexDirection: "column",
  },
  connections: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  displayColumn: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "1.5em",
  },
  homeWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
    margin: "2em 3em",
  },
  friendProfileWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  friendsBar: {
    backgroundColor: "inherit",
    color: "#FFF",
    width: "100%",
    backgroundColor: "#040B0C",
    height: "4em",
    borderRadius: "1em",
    marginBottom: "1em",
  },
}));

export default function DisBox(props) {
  //props destructure
  const { disStyle, children, ...rest } = props;

  //styles
  const classes = useStyles();

  //dynamic classname
  const boxClass = classNames(classes.root, {
    [classes.navBox]: disStyle === "navBox",
    [classes.friendsBar]: disStyle === "friendsBar",
    [classes.connections]: disStyle === "connections",
    [classes.homeWrapper]: disStyle === "homeWrapper",
    [classes.friendListBox]: disStyle === "friendListBox",
    [classes.displayColumn]: disStyle === "displayColumn",
    [classes.friendProfileWrapper]: disStyle === "friendProfileWrapper",
  });

  return (
    <Box className={boxClass} {...rest}>
      {children}
    </Box>
  );
}
