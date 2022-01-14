import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Navbar/Nav";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import TestPage from "./pages/TestPage";
import Sidevar from "./components/Member/Sidevar";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route element={<HomePage />} path="/" exact="true" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<TestPage />} path="/test" />
            <Route element={<Sidevar />} path="/1" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
