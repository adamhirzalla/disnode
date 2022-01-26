import axios from "axios";
import {
  SET_USER,
  SET_TOKENS,
  SET_UNAUTHENTICATED,
  TOKEN_KEY,
  SET_REQUESTS,
} from "../utils/constants";

export const isAuth = (dispatch) => {
  const tokens = JSON.parse(localStorage.getItem(TOKEN_KEY));
  tokens ? getMe(dispatch, tokens) : dispatch({ type: SET_UNAUTHENTICATED });
};

export const getMe = async (dispatch, tokens) => {
  await updateTokens(dispatch, tokens.refreshToken);

  try {
    const res = await axios.get("/api/me");
    const user = res.data;
    dispatch({
      type: SET_USER,
      user,
    });
    // dispatch({
    //   type: SET_REQUESTS,
    //   requests: user.requests,
    // });
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive user information", e);
  }
};

export const updateTokens = async (dispatch, key) => {
  setAxiosHeader(key);
  try {
    const res = await axios.get("/api/token");
    const tokens = res.data;
    saveTokens(tokens);
    setAxiosHeader(tokens.accessToken);
    dispatch({
      type: SET_TOKENS,
      tokens,
    });
  } catch (e) {
    console.log("Failed to update token", e);
  }
};

export const login = async (input) => {
  try {
    const res = await axios.post("/api/login", input);
    const { tokens } = res.data;
    saveTokens(tokens);
    window.location.reload();
  } catch (e) {
    alert("Invalid username or password!");
  }
};

export const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  setAxiosHeader(tokens.accessToken);
};

export function setAxiosHeader(token) {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
export const register = async (input) => {
  try {
    await axios.post("/api/register", input);
    return true;
  } catch (e) {
    console.log("Failed to Register");
  }
};

// TODO: add userId as param for sockets
export const logout = (dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  setAxiosHeader();
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.reload();
};
