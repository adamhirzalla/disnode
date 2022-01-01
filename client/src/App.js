import "./App.css";
import ContainedButton from "./components/Button/ContainedButton";
import AddMemberModal from "./components/AddMembers/AddMemberModal";
import ServerBar from "./components/Navbar/ServerBar";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { theme } from "./appTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import AddMemberBar from "./components/AddMembers/AddMemberBar";

function App() {
  const testArr = [
    { name: "jono", id: 1 },
    { name: "cyn", id: 2 },
    { name: "adam", id: 3 },
    { name: "hyunsu", id: 4 },
  ];

  // const testArr = ["jono", "cyn", "adam", "hyunsu"];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ServerBar />
        <ContainedButton name="Create" />
        <AddMemberModal
          icon={<AddCircleOutlineRoundedIcon fontSize="small" />}
          members={
            <AddMemberBar
              icon={<AddCircleOutlineRoundedIcon fontSize="small" />}
              friends={testArr}
            />
          }
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
