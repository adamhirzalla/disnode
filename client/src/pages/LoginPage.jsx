import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as login } from "../network/authApi";
import { SET_USER } from "../utils/constants";
import AuthContext from "../contexts/AuthContext";

const LoginPage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [input, setInput] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  useEffect(() => {
    if (state.authenticated) navigate("/");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await login(input);
    if (!user) return;
    dispatch({
      type: SET_USER,
      user,
    });
    navigate("/");
  };

  return (
    <div>
      <br />
      <br />
      <form onSubmit={handleLogin}>
        <span>Username </span>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={input.username}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, username: e.target.value }))
          }
        ></input>
        <br />
        <br />
        <span>Password </span>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
