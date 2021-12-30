import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import "./App.css";
import Register from "./auth/Register";
import Nav from "./auth/Nav";
import Home from "./auth/Home";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<Home />} path="/" exact="true" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
