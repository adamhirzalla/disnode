import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
  // shadows: ["none"],
});
