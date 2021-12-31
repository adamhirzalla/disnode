import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";

const HomePage = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <>
      {state.authenticated ? (
        <div>
          Welcome {state.user.full_name}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>Please login</div>
      )}
    </>
  );
};

export default HomePage;
