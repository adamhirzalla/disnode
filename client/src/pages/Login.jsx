import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../network/authApi";
import AuthContext from "../contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  TextField,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useLoginStyles } from "../components/styles/useLoginStyles";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [input, setInput] = useState({ username: "", password: "" });
  const classes = useLoginStyles();

  const navigate = useNavigate();

  // If user is logged in, redirect to home
  useEffect(() => {
    if (state.authenticated) navigate("/");
  }, [state.authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(input);
    setInput((prev) => ({ ...prev, password: "" }));
  };

  return (
    <Container component="main" sx={{ height: "100vh", width: "60vw" }}>
      <Avatar
        alt="Disnode"
        src="/images/Disnode.png"
        sx={{ width: 60, height: 60 }}
      ></Avatar>
      <Box
        className={classes.TextField}
        component="form"
        onSubmit={handleLogin}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={input.username}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: 5 }}
        >
          Sign In
        </Button>
      </Box>
      <Grid container>
        <Grid item xs>
          {" "}
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
