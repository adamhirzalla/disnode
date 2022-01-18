import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  // components: {
  //   MuiBox: {
  //     styleOverrides: {
  //       root: {
  //         width: "100%",
  //       },
  //     },
  //   },
  // },
  palette: {
    mode: "dark",
  },
});
