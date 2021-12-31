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

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const getUser = async (key) => {
    try {
      const headers = {
        Authorization: `Bearer ${key}`,
      };
      const response = await axios.get("/api/me", { headers });
      const user = response.data;
      setUser((prev) => ({ ...prev, ...user }));
    } catch (e) {
      console.log(e);
    }
  };

  const updateTokens = async () => {
    try {
      const refreshToken = JSON.parse(
        localStorage.getItem("authTokens")
      ).refreshToken;
      const response = await axios.post("/api/token", { refreshToken });
      const updatedTokens = await response.data;
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
      setAuthTokens((prev) => ({ ...prev, ...updatedTokens }));
      getUser(updatedTokens.accessToken);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) updateTokens();
    const refreshToken = setInterval(() => {
      authTokens && updateTokens();
    }, 200000);
    return () => clearInterval(refreshToken);
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
