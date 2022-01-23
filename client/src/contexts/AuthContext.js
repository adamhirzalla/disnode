import { createContext, useEffect, useReducer, useRef } from "react";
import reducer from "../reducers/reducer";
import { isAuth, updateTokens } from "../network/authApi";
import socket from "../utils/socket/index";
import { SET_ACTIVE_USERS, SET_SOCKET, SET_USER } from "../utils/constants";

const AuthContext = createContext();
export default AuthContext;

export const initialState = {
  loading: true,
  authenticated: false,
  user: {},
  tokens: null,
  error: null,
  activeUsers: [],
  socket: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sio = useRef();

  // landing socket connection on app load
  useEffect(async () => {
    if (!state.loading && state.authenticated) {
      sio.current = socket;

      dispatch({
        type: SET_SOCKET,
        socket,
      });

      console.log("socket handshake with fingerprint", socket.id);

      socket.on("connection", (activeUsers) => {
        dispatch({
          type: SET_ACTIVE_USERS,
          activeUsers,
        });
      });

      socket.on("disconnection", (activeUsers) => {
        dispatch({
          type: SET_ACTIVE_USERS,
          activeUsers,
        });
      });
    }
    return () => socket.off();
  }, [state.authenticated, socket]);

  useEffect(() => {
    isAuth(dispatch);
    // timer to refresh access token using refresh token every 23 hours
    // (this happens if the user doesnt refresh the page for 23 hours)
    // refresh token is set to expire in 24 hours unless refreshed by navigation or timer
    const tokenInterval = setInterval(() => {
      state.authenticated && updateTokens(dispatch, state.tokens.refreshToken);
    }, 1000 * 60 * 60 * 23);
    return () => {
      clearInterval(tokenInterval);
      socket.off();
    };
  }, []);

  const setUser = (user) => {
    dispatch({ type: SET_USER, user });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
