import { createContext, useEffect, useReducer } from "react";
import reducer from "../reducers/reducer";
import { isAuth, updateTokens } from "../network/authApi";

const AuthContext = createContext();
export default AuthContext;

export const initialState = {
  loading: true,
  authenticated: false,
  user: {},
  tokens: null,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    isAuth(dispatch);
    const tokenInterval = setInterval(() => {
      state.authenticated && updateTokens(dispatch, state.tokens.refreshToken);
    }, 1000 * 60 * 60 * 23);
    return () => clearInterval(tokenInterval);
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
