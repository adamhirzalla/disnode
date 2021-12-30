import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    console.log(e.target.password.value);
    // axios
    //   .get("http://localhost:8001/api/users")
    //   .then((data) => console.log(data.data));

    axios
      .post("http://localhost:8001/api/login", {
        username: userName,
        password,
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("authTokens", JSON.stringify(data.data));
        localStorage.setItem("refresh_token", data.data.refreshToken);
        console.log(
          JSON.parse(localStorage.getItem("authTokens")).refreshToken
        );

        // console.log(data.data.accessToken);
      });
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={() => localStorage.clear()}>
        Logout
      </button>
    </div>
  );
};

export default Login;
