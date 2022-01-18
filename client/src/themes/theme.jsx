import { createTheme } from "@mui/material";

export const theme = createTheme({
  // components: {
  //   MuiBox: {
  //     styleOverrides: {
  //       root: {
  //         width: "100%",
  //       },
  //     },
  //   },
  // },
  typography: {
    fontFamily: "Roboto Mono",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto Mono",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  palette: {
    mode: "dark",
  },
});
