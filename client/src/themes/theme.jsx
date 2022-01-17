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
  shadows: ["none"],
});
