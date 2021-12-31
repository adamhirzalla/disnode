import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  // If tokens exist, send a user to home
  useEffect(() => {
    if (authTokens) navigate("/");
  }, []);

  return (
    <div>
      <br />
      <br />
      <form onSubmit={loginUser}>
        <span>Username </span>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}></input>
        <br />
        <br />
        <span>Password </span>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
