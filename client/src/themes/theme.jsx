import { createTheme } from "@mui/material";

export const theme = createTheme({
<<<<<<< HEAD
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
=======
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
>>>>>>> 079ff3439bfde8bb07c373d7eef09e3f4f4ab759
  },
  // shadows: ["none"],
});
