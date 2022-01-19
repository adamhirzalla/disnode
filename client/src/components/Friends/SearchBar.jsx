import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import DisBox from "../Box/DisBox";
import DisTypography from "../Box/DisTypography";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar } from "@mui/material";

// styles
import { useBoxStyles } from "../styles/useBoxStyles";
const useStyles = makeStyles(() => ({
  search: {
    backgroundColor: "inherit",
    color: "#FFF",
    borderRadius: ".7em",

    "&:hover": {
      backgroundColor: "inherit",
      color: "#FFF",
    },
  },
  appBar: {
    top: "10px",
    bottom: "auto",
    left: "7.9em",
    width: "31.0em",
    backgroundColor: "#040B0C",
    color: "#FFF",
    borderRadius: "1em",
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
      width: "15ch",
      "&:focus": {
        width: "41.5ch",
      },
    },
  },
}));

export default function SearchBar() {
  const boxClasses = useBoxStyles();
  const classes = useStyles();
  return (
    <Box component="form" className={boxClasses.stickyFriendBar}>
      {/* <DisBox component="form" disStyle="friendsBar"> */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <DisTypography variant="h6" noWrap component="div">
            Friends List
          </DisTypography>
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
      </AppBar>
      {/* </DisBox> */}
    </Box>
  );
}
