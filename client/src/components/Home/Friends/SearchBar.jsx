import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Typography } from "@mui/material";

// styles
import { useBoxStyles } from "../../styles/useBoxStyles";
const useStyles = makeStyles(() => ({
  box: {
    width: 511,
    backgroundColor: "#FFF",
    borderRadius: "0px 0px 15px 0px",
    position: "fixed",
    top: "0",
    height: "5em",
    zIndex: 2,
  },
  search: {
    backgroundColor: "inherit",
    color: "#FFF",
    borderRadius: ".7em",

    "&:hover": {
      backgroundColor: "inherit",
      color: "#FFF",
    },
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    width: 510,
    height: "5em",
    backgroundColor: "#040B0C",
    color: "#FFF",

    borderRadius: "0px 15px 15px 0px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "2em",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    height: "2em",
    fontSize: "1em",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "17ch",
      "&:focus": {
        width: "38ch",
      },
    },
  },
}));

export default function SearchBar() {
  const boxClasses = useBoxStyles();
  const classes = useStyles();
  return (
    <Box component="form" className={classes.box}>
      {/* <DisBox component="form" disStyle="friendsBar"> */}
      {/* <AppBar position="fixed" className={classes.appBar}> */}
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" noWrap component="div">
          Friends List
        </Typography>
        <Search className={classes.search}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Friends..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
      {/* </AppBar> */}
      {/* </DisBox> */}
    </Box>
  );
}
