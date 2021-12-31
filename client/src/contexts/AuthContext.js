import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const initialTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : {};

  const [authTokens, setAuthTokens] = useState(initialTokens);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Register a user
  const registerUser = async (e) => {
    e.preventDefault();
    const userInfo = {
      full_name: e.target.full_name.value,
      display_name: e.target.display_name.value,
      username: e.target.username.value,
      email: e.target.username.value,
      password: e.target.password.value,
      repeat_password: e.target.confirm_password.value,
    };
    // Check if forms are filled in
    if (Object.values(userInfo).includes("")) {
      return alert("Please fill in all the forms");
    }
    try {
      const res = await axios.post("/api/register", userInfo);
      const { tokens, user } = res.data;
      setAuthTokens((prev) => ({ ...prev, ...tokens }));
      setUser((prev) => ({ ...prev, ...user }));
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  // Login a user
  const loginUser = async (e) => {
    const userInfo = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", userInfo);
      const { tokens, user } = res.data;
      setAuthTokens((prev) => ({ ...prev, ...tokens }));
      setUser((prev) => ({ ...prev, ...user }));
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      navigate("/");
    } catch (e) {
      alert("Check your username or password");
    }
  };

  // Logout a user
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  // Get a user information
  const getUser = async (key) => {
    try {
      const headers = {
        Authorization: `Bearer ${key}`,
      };
      const res = await axios.get("/api/me", { headers });
      const user = res.data;
      setUser((prev) => ({ ...prev, ...user }));
    } catch (e) {
      console.log(e);
    }
  };

  // Update tokens
  const updateTokens = async () => {
    if (localStorage.getItem("authTokens")) {
      try {
        const refreshToken = JSON.parse(
          localStorage.getItem("authTokens")
        ).refreshToken;
        const res = await axios.post("/api/token", { refreshToken });
        const updatedTokens = await res.data;
        localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
        setAuthTokens((prev) => ({ ...prev, ...updatedTokens }));
        getUser(updatedTokens.accessToken);
      } catch (e) {
        console.log(e);
      }
      return setLoading(false);
    }
    logoutUser();
    setLoading(false);
  };

  useEffect(() => {
    if (loading) updateTokens();
    const refreshToken = setInterval(() => {
      authTokens && updateTokens();
    }, 200000);
    return () => clearInterval(refreshToken);
  }, []);

  // send data/function to children components
  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
