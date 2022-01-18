import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { ServerProvider } from "./contexts/ServerContext";
import { theme, darkTheme } from "./themes/theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import { useState } from "react";

function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={dark ? darkTheme : theme}>
          <Router>
            <AuthProvider>
              <ServerProvider>
                <Routes>
                  // TODO: refactor to use custom Private/Public Routes instead
                  //
                  https://codesandbox.io/s/react-router-v6-security-gojb0?file=/src/App.js
                  <Route element={<Home />} path="/" exact="true" />
                  <Route element={<Login />} path="/login" />
                  <Route element={<Register />} path="/register" />
                  <Route element={<Test />} path="/test" />
                </Routes>
              </ServerProvider>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
