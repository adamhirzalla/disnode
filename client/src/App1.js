import "./App.css";
import ContainedButton from "./Button/ContainedButton";
import AddMemberModal from "./AddMembers/AddMemberModal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { theme } from "./appTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import AddMemberBar from "./AddMembers/AddMemberBar";
import ChannelBar from "./Navbar/ChannelBar";
import MemberBar from "./components/Navbar/MemberBar";

export default function App() {
  const testArr = [
    { name: "jono", id: 1 },
    { name: "cyn", id: 2 },
    { name: "adam", id: 3 },
    { name: "hyunsu", id: 4 },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
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
