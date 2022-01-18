import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../network/authApi";
import AuthContext from "../contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { useLoginStyles } from "../components/styles/useLoginStyles";
import { useButtonStyles } from "../components/styles/useButtonStyles";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [input, setInput] = useState({ username: "", password: "" });
  const classes = useLoginStyles();
  const buttons = useButtonStyles();

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
    <Container className={classes.main} component="main">
      <Box className={classes.section} component="section">
        <Box className={classes.header}>
          <Avatar
            alt="Disnode"
            src="/images/Disnode.png"
            sx={{ width: 60, height: 60 }}
          ></Avatar>
          <b>Log In</b>
        </Box>
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
            className={buttons.login}
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
        </Box>
        <Grid container>
          <Grid item xs>
            {" "}
          </Grid>
          <Grid item sx={{ fontSize: "large" }}>
            <b>{"Don't have an account? Sign Up"}</b>
            <Link
              href="/register"
              variant="body2"
              sx={{ textDecoration: "none" }}
            >
              <Button
                className={buttons.login}
                type="submit"
                variant="contained"
                sx={{ ml: 3 }}
              >
                Sign Up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
