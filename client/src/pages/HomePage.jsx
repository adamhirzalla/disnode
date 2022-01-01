import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../network/authApi";

const HomePage = () => {
  const { state, dispatch } = useContext(AuthContext);

  // If user is not logged in, redirect to login
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.authenticated) navigate("/login");
  }, []);

  const handleLogout = () => {
    logout(dispatch);
  };
  return (
    <div>
      Welcome {state.user.full_name}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;