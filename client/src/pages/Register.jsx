import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisButtonStyles } from "../components/styles/useDisButtonStyles";
import { useLoginStyles } from "../components/styles/useLoginStyles";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";
import { register } from "../network/authApi";
import { HOME } from "../utils/constants";

const initialInput = {
  full_name: "",
  nickname: "",
  username: "",
  email: "",
  password: "",
  repeat_password: "",
};
const useStyles = makeStyles({
  login: {
    margin: "auto auto",
    border: "2px solid black",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
    backgroundColor: "rgb(16, 16, 16,0.4)",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1em 2em 2em 2em",
    minWidth: "45%",
    height: "45%",
  },
});
const Register = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { setMode } = useContext(ServerContext);
  const [input, setInput] = useState(initialInput);
  // const classes = useLoginStyles();
  const buttons = useDisButtonStyles();
  const classes = useStyles();
  // If user is logged in, redirect to home
  useEffect(() => {
    // if (state.authenticated) navigate("/");
  }, []);

  const handleSingup = async (e) => {
    e.preventDefault();
    setInput(initialInput);
    const success = await register(input);
    if (!success) return;
    alert("Registration successful, please login");
    setMode(HOME);
    // navigate("/login");
  };

  const login = () => {
    setMode(HOME);
  };
  return (
    <Stack className={classes.login}>
      <Avatar
        alt="Disnode"
        src="/images/Disnode-red.png"
        sx={{ width: 80, height: 80 }}
      ></Avatar>
      <b style={{ fontSize: "25px" }}>Register</b>
      <Box component="form" className={classes.main} onSubmit={handleSingup}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Full Name"
          type="text"
          autoFocus
          value={input.full_name}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, full_name: e.target.value }))
          }
        />
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <TextField
            margin="normal"
            required
            label="Username"
            type="text"
            value={input.username}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <TextField
            margin="normal"
            required
            label="Nick Name"
            value={input.nickname}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, nickname: e.target.value }))
            }
          />
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={input.email}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          value={input.repeat_password}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              repeat_password: e.target.value,
            }))
          }
        />
        <Button
          variant="contained"
          disableRipple
          type="submit"
          sx={{
            color: "white",
            opacity: 0.8,
            "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
            backgroundColor: "rgb(199, 58, 58,0.8)",
          }}
          // startIcon={<DoNotDisturbIcon />}
        >
          Sign up
        </Button>
      </Box>
      <b>{"Don't have an account? "}</b>
      <Link
        onClick={login}
        variant="body2"
        sx={{
          textDecoration: "none",
          color: "red",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        LOG IN
      </Link>
    </Stack>
  );
};

export default Register;
