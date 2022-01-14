import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { theme } from "./themes/theme";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route element={<HomePage />} path="/" exact="true" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<RegisterPage />} path="/register" />
                <Route element={<TestPage />} path="/test" />
              </Routes>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
