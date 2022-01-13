import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { register } from "../network/authApi";

const initialInput = {
  full_name: "",
  display_name: "",
  username: "",
  email: "",
  password: "",
  repeat_password: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const [input, setInput] = useState(initialInput);

  // If user is logged in, redirect to home
  useEffect(() => {
    if (state.authenticated) navigate("/");
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const success = await register(input);
    if (!success) return;
    alert("Registration successful, please login");
    navigate("/login");
  };

  return (
    <div>
      <br />
      <p>Full Name | Display Name </p>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="full_name"
          placeholder="full name"
          value={input.full_name}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              full_name: e.target.value,
            }))
          }
        ></input>
        <input
          type="text"
          name="display_name"
          placeholder="display name"
          value={input.display_name}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              display_name: e.target.value,
            }))
          }
        ></input>
        <p> Username | Email</p>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={input.username}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, username: e.target.value }))
          }
        ></input>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          value={input.email}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, email: e.target.value }))
          }
        ></input>
        <p> Password </p>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
        ></input>
        <p> Confirm Password </p>
        <input
          type="password"
          name="confirm_password"
          placeholder="confirm password"
          value={input.confirm_password}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              repeat_password: e.target.value,
            }))
          }
        ></input>
        <br />
        <button type="sumbit">Register</button>
      </form>
      <br />
      <button type="button" onClick={() => setInput((prev) => initialInput)}>
        Clear
      </button>
    </div>
  );
};

export default RegisterPage;
