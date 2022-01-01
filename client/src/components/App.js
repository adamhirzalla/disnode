import "./App.css";
import ContainedButton from "./Button/ContainedButton";
import AddMemberModal from "./Modal/AddMemberModal";
import ServerBar from "./Navbar/ServerBar";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { theme } from "./appTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ServerBar />
        <ContainedButton name="Create" />
        <AddMemberModal icon={<AddCircleOutlineRoundedIcon />} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
