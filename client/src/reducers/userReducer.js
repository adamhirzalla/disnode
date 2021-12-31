import {
  SET_LOADING,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_ACTIVE_USERS,
  SET_TOKENS,
} from "../utils/constants";
import { initialState } from "../contexts/AuthContext";

export default function userReducer(state, action) {
  const { user, activeUsers, tokens, error } = action;
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user,
      };
    case SET_TOKENS:
      return {
        ...state,
        tokens,
      };
    case SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        loading: false,
      };
    default:
      return { ...state, error: `Unsupported action type: ${action.type}` };
  }
}
