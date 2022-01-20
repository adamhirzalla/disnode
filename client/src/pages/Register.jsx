import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisButtonStyles } from "../components/styles/useDisButtonStyles";
import { useLoginStyles } from "../components/styles/useLoginStyles";
import AuthContext from "../contexts/AuthContext";
import { register } from "../network/authApi";

const initialInput = {
  full_name: "",
  nickname: "",
  username: "",
  email: "",
  password: "",
  repeat_password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const [input, setInput] = useState(initialInput);
  const classes = useLoginStyles();
  const buttons = useDisButtonStyles();

  // If user is logged in, redirect to home
  useEffect(() => {
    if (state.authenticated) navigate("/");
  }, []);

  const handleSingup = async (e) => {
    e.preventDefault();
    setInput(initialInput);
    const success = await register(input);
    if (!success) return;
    alert("Registration successful, please login");
    navigate("/login");
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
          <b>SIGN UP</b>
        </Box>
        <Box
          className={classes.TextField}
          component="form"
          onSubmit={handleSingup}
        >
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
          <Button className={buttons.submit} type="submit" fullWidth>
            SIGN UP
          </Button>
        </Box>
        <Grid container>
          <Grid item sx={{ fontSize: "large" }}>
            <b>{"Don't have an account? "}</b>
            <Link href="/login" variant="body2" sx={{ textDecoration: "none" }}>
              LOG IN
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
