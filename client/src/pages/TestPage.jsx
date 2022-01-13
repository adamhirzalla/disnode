import React from "react";
import ContainedButton from "../components/Button/ContainedButton";
import AddMemberModal from "../components/AddMembers/AddMemberModal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { theme } from "../themes/appTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import AddMemberBar from "../components/AddMembers/AddMemberBar";
import JoinServerModal from "../components/Modal/JoinServerModal";
import MemberBar from "../components/Navbar/MemberBar";

export default function TestPage() {
  const testArr = [
    { name: "jono", id: 1 },
    { name: "cyn", id: 2 },
    { name: "adam", id: 3 },
    { name: "hyunsu", id: 4 },
    { name: "jono", id: 5 },
    { name: "cyn", id: 6 },
    { name: "adam", id: 7 },
    { name: "hyunsu", id: 8 },
    { name: "jono", id: 9 },
    { name: "cyn", id: 10 },
    { name: "adam", id: 11 },
    { name: "hyunsu", id: 12 },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MemberBar>
          <ContainedButton name="Create" />
        </MemberBar>

        <JoinServerModal />
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
